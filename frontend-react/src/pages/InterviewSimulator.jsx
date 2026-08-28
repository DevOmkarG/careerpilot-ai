import { useState } from "react";
import axios from "axios";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import {
  Bot,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

const API = "http://127.0.0.1:8000";

// "setup" -> "live" -> "results"
export default function InterviewPage() {
  const [stage, setStage] = useState("setup");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const [feedback, setFeedback] = useState(null);

  async function startInterview() {
    if (!role.trim()) {
      alert("Enter the role you're interviewing for.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/interview`,
        { role },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setQuestions(res.data.questions || []);
      setAnswers(new Array((res.data.questions || []).length).fill(""));
      setCurrentIndex(0);
      setCurrentAnswer("");
      setStage("live");
    } catch (err) {
      console.error(err);
      alert("Couldn't generate questions. Try again.");
    }
    setLoading(false);
  }

  function goNext() {
    const updated = [...answers];
    updated[currentIndex] = currentAnswer;
    setAnswers(updated);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentAnswer(updated[currentIndex + 1] || "");
    } else {
      submitInterview(updated);
    }
  }

  function goBack() {
    const updated = [...answers];
    updated[currentIndex] = currentAnswer;
    setAnswers(updated);

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentAnswer(updated[currentIndex - 1] || "");
    }
  }

  async function submitInterview(finalAnswers) {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/interview-feedback`,
        { role, questions, answers: finalAnswers },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setFeedback(res.data);
      setStage("results");
    } catch (err) {
      console.error(err);
      alert("Couldn't generate feedback. Try again.");
    }
    setLoading(false);
  }

  function restart() {
    setStage("setup");
    setRole("");
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    setCurrentAnswer("");
    setFeedback(null);
  }

  return (
    <WorkspaceLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Interview AI
          </h1>
          <p className="text-slate-500 mt-2">
            Practice mock interviews personalized to your resume.
          </p>
        </div>

        {/* ---------------- SETUP ---------------- */}
        {stage === "setup" && (
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-10 max-w-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Bot size={22} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mt-5">
              What role are you interviewing for?
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              We'll generate 10 questions based on this role and the skills
              detected in your most recently analyzed resume.
            </p>

            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer, Data Analyst"
              className="w-full mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
            />

            <button
              onClick={startInterview}
              disabled={loading}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? (
                "Generating questions…"
              ) : (
                <>
                  Start mock interview
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}

        {/* ---------------- LIVE Q&A ---------------- */}
        {stage === "live" && questions.length > 0 && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <div className="flex gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-6 rounded-full ${
                      i <= currentIndex ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8">
              <p className="text-lg font-semibold text-slate-800 leading-7">
                {questions[currentIndex]}
              </p>

              <textarea
                rows={7}
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer as you'd say it out loud…"
                className="w-full mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none focus:border-blue-400 focus:bg-white transition resize-none"
              />

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={goBack}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition disabled:opacity-40"
                >
                  <ArrowLeft size={15} />
                  Back
                </button>
                <button
                  onClick={goNext}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {loading
                    ? "Scoring…"
                    : currentIndex === questions.length - 1
                    ? "Finish & get feedback"
                    : "Next question"}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- RESULTS ---------------- */}
        {stage === "results" && feedback && (
          <div className="max-w-2xl space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-8 border-blue-100">
                <span className="text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
                  {feedback.score}
                </span>
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-800">
                Interview Score
              </h2>
              <p className="text-sm text-slate-500 mt-1">for {role}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-7">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} className="text-teal-600" />
                <h3 className="font-bold text-slate-800">Strengths</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {feedback.strengths?.map((s, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-teal-600">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-7">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-amber-600" />
                <h3 className="font-bold text-slate-800">Areas to improve</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {feedback.weaknesses?.map((w, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-amber-600">•</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-7">
              <div className="flex items-center gap-2 mb-4">
                <Bot size={18} className="text-blue-600" />
                <h3 className="font-bold text-slate-800">Suggestions</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {feedback.suggestions?.map((s, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="text-blue-600">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={restart}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
            >
              <RotateCcw size={16} />
              Practice another role
            </button>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}