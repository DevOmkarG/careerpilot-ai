from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.get("/")
def home():
    return {"message": "CareerPilot AI Backend Running"}

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    return {
        "filename": file.filename,
        "message": "Resume uploaded successfully"
    }