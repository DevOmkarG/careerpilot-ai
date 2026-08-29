<h1 align="center">🎯 CareerPilot-AI</h1>

<p align="center">
  AI-powered resume analysis & career readiness SaaS platform for students and job seekers.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=flat-square&logo=fastapi" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=flat-square&logo=googlegemini&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
</p>

<!-- Add a screenshot or GIF of your dashboard here -->
<!-- <p align="center"><img src="./screenshots/dashboard.png" width="800"></p> -->

---

## 📖 About

**CareerPilot-AI** is a full-stack SaaS platform that helps students and job seekers improve their resumes and interview readiness using AI. Built for both Indian and international users, it combines resume analysis, mock interviews, and placement tools in one platform.

## ✨ Features

- 📄 **AI Resume Analysis** — Get instant, AI-driven feedback on resume quality using Google Gemini
- 🎙️ **AI Mock Interview** — Practice interviews with an AI interviewer and get performance feedback
- 🏫 **Campus / Placement Officer Dashboard** — Tools for college placement cells to track student readiness
- 💳 **Freemium Subscription System** — Tiered access with gated premium features
- 🔐 **Secure Authentication** — Full auth flow with protected routing
- 📊 **Personalized Dashboard** — Track resume scores, interview performance, and progress over time

## 🛠️ Tech Stack

**Frontend:** React (Vite) + Tailwind CSS
**Backend:** FastAPI (Python)
**Database:** MongoDB Atlas
**AI:** Google Gemini API
**Deployment:** Render / Railway

## 🏗️ Architecture

```
careerpilot-ai/
├── frontend/          # React + Vite + Tailwind SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
├── backend/           # FastAPI service
│   ├── routes/
│   ├── models/
│   └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- MongoDB Atlas account
- Google Gemini API key

### Installation

```bash
# Clone the repo
git clone https://github.com/DevOmkarG/careerpilot-ai.git
cd careerpilot-ai

# Frontend setup
cd frontend
npm install
npm run dev

# Backend setup
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
JWT_SECRET=your_jwt_secret
```

## 📸 Screenshots


## 🔗 Live Demo

**[careerpilot-ai.example.com](https://devomkarg.github.io/careerpilot-ai/)** 
## 🗺️ Roadmap

- [ ] Add multi-language resume support
- [ ] LinkedIn profile import
- [ ] Advanced analytics for placement officers
- [ ] Chrome extension for quick resume scan

## 👤 Author

**Omkar** — Final Year AI/ML Student
[GitHub](https://github.com/DevOmkarG) · [LinkedIn](https://linkedin.com/in/your-linkedin)

---

<p align="center">⭐️ If you found this project interesting, consider giving it a star!</p>
