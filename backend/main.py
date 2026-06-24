from fastapi import FastAPI, UploadFile, File
from resume_parser import extract_text_from_pdf
from skills import detect_skills
from ats import calculate_ats_score
from suggestions import get_missing_skills

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CareerPilot AI Backend Running"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file)
    
    skills = detect_skills(text)
    
    ats_score = calculate_ats_score(skills)
    
    missing_skills = get_missing_skills(skills)

    return {
        "filename": file.filename,
        "characters_found": len(text),
        "skills_detected": skills,
        "ats_score": ats_score,
        "missing_skills": missing_skills
    }