import os
import json
import time

from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-3.5-flash"

client = genai.Client(api_key=API_KEY) if API_KEY else None


class _GeminiModel:
    """Keeps the old `model.generate_content(prompt)` interface so that
    main.py (chat, cover letter, job match, interview) needs no changes."""

    def generate_content(self, prompt):
        if client is None:
            raise RuntimeError("GEMINI_API_KEY is not set")
        return client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )


model = _GeminiModel()


def _fallback(summary, review):
    return json.dumps({
        "summary": summary,
        "resume_level": "Unknown",
        "confidence_score": 0,
        "interview_readiness": "Unknown",
        "career_paths": [],
        "strengths": [],
        "missing_skills": [],
        "suggestions": [],
        "review": review,
    })


def safe_generate(prompt):

    try:
        response = model.generate_content(prompt)
        return response.text

    except errors.APIError as e:

        # 429 = quota / rate limit: wait and retry once
        if e.code == 429:
            print("Gemini quota reached. Retrying...")
            time.sleep(5)

            try:
                response = model.generate_content(prompt)
                return response.text
            except Exception:
                return _fallback("AI quota exceeded.", "Gemini quota exceeded.")

        return _fallback("AI Error", str(e))

    except Exception as e:

        return _fallback("AI Error", str(e))


def get_ai_review(
    resume_text,
    ats_score,
    skills,
    missing_skills,
    suggestions,
    job_description=None
):

    prompt = f"""

You are a Senior Technical Recruiter,
ATS Expert,
Career Coach,
and Resume Reviewer.

Analyze the resume professionally.

Resume:

{resume_text}

ATS Score:

{ats_score}

Detected Skills:

{skills}

Missing Skills:

{missing_skills}

Suggestions:

{suggestions}

"""

    if job_description:

        prompt += f"""

Job Description:

{job_description}

Also compare the resume with this Job Description.

"""

    prompt += """

Return ONLY VALID JSON.

Do NOT write markdown.

Do NOT use ```.

Do NOT explain.

Return exactly this structure.

{

"summary":"",

"resume_level":"",

"confidence_score":90,

"interview_readiness":"",

"career_paths":[

"...",

"...",

"..."

],

"strengths":[

"...",

"...",

"..."

],

"missing_skills":[

"...",

"..."

],

"suggestions":[

"...",

"...",

"..."

],

"review":""

}

Rules:

summary:
Maximum 60 words.

resume_level:
Choose one

Beginner

Intermediate

Advanced

Professional

confidence_score:
Number between 0 and 100.

interview_readiness:
One sentence only.

career_paths:
Maximum 5.

strengths:
Maximum 6.

missing_skills:
Maximum 8.

suggestions:
Maximum 6.

review:
Maximum 250 words.

"""

    response = safe_generate(prompt)

    try:

        return json.loads(response)

    except Exception:

        return {

            "summary": "Unable to parse AI response.",

            "resume_level": "Unknown",

            "confidence_score": 0,

            "interview_readiness": "Unknown",

            "career_paths": [],

            "strengths": [],

            "missing_skills": [],

            "suggestions": [],

            "review": response

        }
