import { useState } from "react";
import {
  Sparkles,
  Copy,
  RefreshCw,
  Download,
  FileText,
} from "lucide-react";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import { generateCoverLetter } from "../services/api";

export default function CoverLetter() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!jobDescription) {
      alert("Enter Job Description");
      return;
    }

    setLoading(true);
    try {
      const res = await generateCoverLetter({
        name: localStorage.getItem("name"),
        company,
        role,
        job_description: jobDescription,
      });
      setCoverLetter(res.cover_letter);
    } catch (err) {
      console.log(err);
      alert("Generation Failed");
    }
    setLoading(false);
  }

  function copyLetter() {
    navigator.clipboard.writeText(coverLetter);
    alert("Copied");
  }

  function downloadLetter() {
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CoverLetter.txt";
    a.click();
  }

  return (
    <WorkspaceLayout rightPanel={<AIChat />}>
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700">
            <Sparkles size={14} />
            AI Cover Letter
          </div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif] mt-5">
            Generate a professional cover letter
          </h1>
          <p className="text-slate-500 mt-3">Recruiter-ready cover letters in seconds.</p>
        </div>

        <div className="grid xl:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Details</h2>

            <div className="space-y-4">
              <input
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
              />
              <input
                placeholder="Job Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
              />
              <textarea
                rows={10}
                placeholder="Paste Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm outline-none resize-none focus:border-blue-400 focus:bg-white transition"
              />
              <button
                onClick={handleGenerate}
                className="w-full rounded-xl py-3.5 bg-blue-600 text-white font-semibold transition hover:bg-blue-700"
              >
                {loading ? "Generating..." : "Generate Cover Letter"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Generated Letter</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyLetter}
                  className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100"
                >
                  <Copy size={17} />
                </button>
                <button
                  onClick={downloadLetter}
                  className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100"
                >
                  <Download size={17} />
                </button>
                <button
                  onClick={handleGenerate}
                  className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100"
                >
                  <RefreshCw size={17} />
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-100 p-6 h-[560px] overflow-y-auto whitespace-pre-wrap leading-7 text-slate-700 text-sm">
              {coverLetter ? (
                coverLetter
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <FileText size={56} />
                  <p className="mt-6 text-sm">Your AI cover letter will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
