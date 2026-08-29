import { useState } from "react";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import { Search, Briefcase, Sparkles } from "lucide-react";
import axios from "axios";

export default function JobMatcher() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleMatch() {
    if (!resume || !jobDescription) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://careerpilot-ai-skk5.onrender.com/job-match", {
        resume,
        job_description: jobDescription,
      });
      setResult(res.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <WorkspaceLayout>
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
            <Sparkles size={14} />
            AI Job Matcher
          </div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif] mt-5">
            Resume vs job description
          </h1>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-5">Resume</h2>
            <textarea
              rows={14}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm outline-none resize-none focus:border-blue-400 focus:bg-white transition"
              placeholder="Paste resume..."
            />
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-5">Job Description</h2>
            <textarea
              rows={14}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm outline-none resize-none focus:border-blue-400 focus:bg-white transition"
              placeholder="Paste job description..."
            />
          </div>
        </div>

        <button
          onClick={handleMatch}
          className="rounded-xl px-8 py-3.5 bg-blue-600 text-white font-semibold transition hover:bg-blue-700"
        >
          {loading ? "Matching..." : "Match Resume"}
        </button>

        {result && (
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
              <Search className="text-blue-600" size={22} />
              <h2 className="text-4xl font-bold text-slate-900 mt-5 [font-family:'Sora',sans-serif]">
                {result.match_score}%
              </h2>
              <p className="text-slate-500 mt-2 text-sm">Match Score</p>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
              <Briefcase className="text-red-500" size={22} />
              <h2 className="text-lg font-bold text-slate-800 mt-4">Missing Skills</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {result.missing_skills.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
              <Sparkles className="text-amber-500" size={22} />
              <h2 className="text-lg font-bold text-slate-800 mt-4">AI Suggestions</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {result.suggestions.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </WorkspaceLayout>
  );
}
