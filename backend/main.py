from fastapi import FastAPI, UploadFile, File, Form, Depends, Header, HTTPException
from resume_parser import extract_text_from_pdf
from skills import detect_skills
from ats import calculate_ats_score
from suggestions import get_missing_skills
from improvements import get_suggestions
from gemini_service import get_ai_review, model
from career_path import get_career_paths
from strengths import get_strengths
from fastapi.middleware.cors import CORSMiddleware
import hashlib
import json
from pydantic import BaseModel
from routes.application_routes import router as application_router
from database import db, users_collection, analysis_collection
from auth import hash_password, verify_password
from jwt_handler import create_access_token, decode_access_token
from datetime import datetime


def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.replace("Bearer ", "")
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = users_collection.find_one({"email": payload["email"]})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user


class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    college_code: str | None = None


class OfficerSignupRequest(BaseModel):
    name: str
    email: str
    password: str
    college_name: str
    college_code: str


class LoginRequest(BaseModel):
    email: str
    password: str


class ChatRequest(BaseModel):
    message: str


cache = {}
resume_memory = {}


def get_hash(text):
    return hashlib.md5(text.encode()).hexdigest()


app = FastAPI()

app.include_router(
    application_router,
    tags=["Applications"]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "CareerPilot AI Backend Running"}


# ---------------- RESUME UPLOAD (token-gated) ----------------
@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(None),
    current_user=Depends(get_current_user),
):
    # 🔒 Free-tier gate — 3 analyses, then upgrade required
    if current_user.get("plan", "free") == "free" and current_user.get("resume_analyses_used", 0) >= 3:
        raise HTTPException(status_code=402, detail="limit_reached")

    pdf_bytes = await file.read()

    text = extract_text_from_pdf(pdf_bytes)

    skills = detect_skills(text)

    ats_score = calculate_ats_score(skills, text)

    missing_skills = get_missing_skills(skills)

    strengths = get_strengths(skills)

    career_paths = get_career_paths(skills)

    resume_memory["resume"] = text
    resume_memory["skills"] = skills
    resume_memory["ats"] = ats_score

    if len(missing_skills) == 0:
        suggestions = [
            "Excellent technical skill coverage.",
            "Focus on improving project descriptions and achievements.",
            "Add quantified results to strengthen ATS performance."
        ]
    else:
        suggestions = get_suggestions(missing_skills)

    resume_id = get_hash(text)

    if resume_id in cache:
        ai_data = cache[resume_id]
    else:
        ai_data = get_ai_review(
            resume_text=text,
            ats_score=ats_score,
            skills=skills,
            missing_skills=missing_skills,
            suggestions=suggestions,
            job_description=job_description
        )
        cache[resume_id] = ai_data

    # ✅ Only increment the counter after a successful analysis
    users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$inc": {"resume_analyses_used": 1}}
    )
    saved_analysis = {
        "user_email": current_user["email"],
        "filename": file.filename,
        "ats_score": ats_score,
        "skills_detected": skills,
        "missing_skills": ai_data.get("missing_skills", missing_skills),
        "created_at": datetime.utcnow().isoformat(),
    }
    analysis_collection.insert_one(saved_analysis)
    return {
        
        "filename": file.filename,
        "characters_found": len(text),
        "skills_detected": skills,
        "ats_score": ats_score,
        "missing_skills": ai_data.get("missing_skills", missing_skills),
        "suggestions": ai_data.get("suggestions", suggestions),
        "strengths": ai_data.get("strengths", strengths),
        "career_paths": ai_data.get("career_paths", career_paths),
        "ai_review": ai_data.get("review", ""),
        "summary": ai_data.get("summary", ""),
        "resume_level": ai_data.get("resume_level", ""),
        "confidence_score": ai_data.get("confidence_score", 0),
        "interview_readiness": ai_data.get("interview_readiness", "")
    }


@app.post("/chat")
async def chat(req: ChatRequest):
    if "resume" not in resume_memory:
        return {"answer": "Please upload your resume first."}

    prompt = f"""
You are CareerPilot AI.

The user has already uploaded their resume.

Resume:
{resume_memory["resume"]}

ATS Score:
{resume_memory["ats"]}

Detected Skills:
{resume_memory["skills"]}

User Question:
{req.message}

Rules:
- Answer only using the uploaded resume whenever possible.
- Give professional career guidance.
- If the user asks for resume improvements, explain clearly.
- Keep the answer under 250 words.
"""

    response = model.generate_content(prompt)

    return {"answer": response.text}


@app.get("/db-test")
def db_test():
    try:
        db.command("ping")
        return {"success": True, "message": "MongoDB Connected Successfully 🚀"}
    except Exception as e:
        return {"success": False, "error": str(e)}


# ---------------- AUTH ----------------
@app.post("/signup")
def signup(data: SignupRequest):
    existing = users_collection.find_one({"email": data.email})
    if existing:
        return {"success": False, "message": "Email already exists."}

    user = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "resume_analyses_used": 0,
        "plan": "free",
        "role": "student",
        "college_code": data.college_code,
    }

    users_collection.insert_one(user)
    return {"success": True, "message": "Account Created Successfully"}


@app.post("/login")
def login(data: LoginRequest):
    user = users_collection.find_one({"email": data.email})

    if not user:
        return {"success": False, "message": "User not found."}

    if not verify_password(data.password, user["password"]):
        return {"success": False, "message": "Wrong password."}

    token = create_access_token({"email": user["email"]})

    return {
        "success": True,
        "token": token,
        "name": user["name"],
        "role": user.get("role", "student"),
    }


# ---------------- SUBSCRIPTION / USAGE ----------------
@app.get("/me/usage")
def get_usage(current_user=Depends(get_current_user)):
    return {
        "used": current_user.get("resume_analyses_used", 0),
        "limit": 3,
        "plan": current_user.get("plan", "free"),
    }


# Temporary manual upgrade endpoint — swap for real Razorpay/Stripe
# webhook verification before going live.
@app.post("/me/upgrade")
def upgrade_plan(current_user=Depends(get_current_user)):
    users_collection.update_one(
        {"_id": current_user["_id"]},
        {"$set": {"plan": "pro"}}
    )
    return {"success": True, "plan": "pro"}


# ---------------- HISTORY ----------------
@app.get("/history")
async def get_history():
    data = []

    for item in analysis_collection.find().sort("_id", -1):
        item["_id"] = str(item["_id"])
        data.append(item)

    return data


@app.delete("/history/{id}")
async def delete_history(id: str):
    from bson import ObjectId

    analysis_collection.delete_one({"_id": ObjectId(id)})

    return {"message": "Deleted"}


# ---------------- COVER LETTER ----------------
@app.post("/cover-letter")
async def generate_cover_letter(data: dict):
    prompt = f"""
Write a professional cover letter.

Name:
{data.get("name")}

Job Description:
{data.get("job_description")}

Resume Summary:
{data.get("summary")}
"""

    response = model.generate_content(prompt)

    return {"cover_letter": response.text}


# ---------------- JOB MATCH ----------------
# NOTE: there were two /job-match routes in the old file (one taking a PDF
# upload, one taking plain JSON). The frontend's JobMatcher.jsx sends
# { resume, job_description } as JSON, so that's the one kept — the
# file-upload version was dead code and has been removed.
@app.post("/job-match")
async def job_match(data: dict):
    prompt = f"""
Compare this Resume with Job Description.

Resume:
{data['resume']}

Job Description:
{data['job_description']}

Return JSON:

{{
"match_score":90,
"missing_skills":["..."],
"suggestions":["..."]
}}

Only return JSON.
"""

    response = model.generate_content(prompt)

    text = response.text.replace("```json", "").replace("```", "")

    return json.loads(text)


# ---------------- INTERVIEW ----------------
@app.post("/interview")
async def interview(data: dict):
    prompt = f"""
Generate 10 interview questions for

{data["role"]}

Return JSON

{{
"questions":[]
}}
"""

    response = model.generate_content(prompt)
    return json.loads(response.text)


@app.post("/interview-feedback")
async def interview_feedback(data: dict):
    prompt = f"""
Role
{data["role"]}

Questions
{data["questions"]}

Answers
{data["answers"]}

Give detailed interview feedback.
Score out of 100.
Strengths.
Weaknesses.
Suggestions.
"""

    response = model.generate_content(prompt)

    return {"feedback": response.text}

def require_officer(current_user=Depends(get_current_user)):
    if current_user.get("role") != "placement_officer":
        raise HTTPException(status_code=403, detail="Officer access only")
    return current_user


@app.post("/officer/signup")
def officer_signup(data: OfficerSignupRequest):
    existing = users_collection.find_one({"email": data.email})
    if existing:
        return {"success": False, "message": "Email already exists."}

    existing_college = users_collection.find_one({
        "role": "placement_officer",
        "college_code": data.college_code,
    })
    if existing_college:
        return {"success": False, "message": "This college code is already registered by another officer."}

    officer = {
        "name": data.name,
        "email": data.email,
        "password": hash_password(data.password),
        "role": "placement_officer",
        "college_name": data.college_name,
        "college_code": data.college_code,
    }

    users_collection.insert_one(officer)
    return {
        "success": True,
        "message": "Officer account created",
        "college_code": data.college_code,
    }


@app.get("/officer/students")
def get_college_students(officer=Depends(require_officer)):
    students = list(users_collection.find({
        "role": "student",
        "college_code": officer["college_code"],
    }))

    result = []
    for s in students:
        latest = analysis_collection.find_one(
            {"user_email": s["email"]},
            sort=[("_id", -1)],
        )
        result.append({
            "name": s["name"],
            "email": s["email"],
            "plan": s.get("plan", "free"),
            "resume_analyses_used": s.get("resume_analyses_used", 0),
            "latest_ats_score": latest["ats_score"] if latest else None,
            "latest_analysis_date": str(latest["_id"].generation_time) if latest else None,
        })

    return {
        "college_name": officer.get("college_name"),
        "college_code": officer["college_code"],
        "total_students": len(result),
        "students": result,
    }
