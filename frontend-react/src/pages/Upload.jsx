import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, ArrowRight, FileText, X } from "lucide-react";
import { uploadResume } from "../services/api";

export default function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Upload your resume first.");
      return;
    }

    try {
      setLoading(true);
      const data = await uploadResume(file, jobDescription);
      navigate("/dashboard", { state: data });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 402) {
        alert("You've used all 3 free analyses. Upgrade to Pro for unlimited analyses.");
        navigate("/settings");
      } else if (err.response?.status === 401) {
        alert("Your session expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Analysis failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-12 [font-family:'Inter',sans-serif]">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">
            Step 1 of 1
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            File your resume
          </h2>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          className={`rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragActive
              ? "border-blue-400 bg-blue-50/50"
              : "border-slate-200 hover:border-blue-300"
          }`}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <UploadCloud size={28} className="text-blue-600" />
          </div>

          <p className="mt-5 text-sm text-slate-500">Drag and drop your PDF here</p>

          <div className="mt-5">
            <label className="cursor-pointer">
              <input
                hidden
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                <FileText size={15} />
                Browse files
              </span>
            </label>
          </div>

          {file && (
            <div className="mt-6 flex items-center justify-between rounded-xl border border-teal-200 bg-teal-50 p-4 text-left">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText size={17} className="flex-shrink-0 text-teal-600" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-500">Ready for analysis</p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                className="flex-shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-600"
                aria-label="Remove file"
              >
                <X size={15} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Job description (optional)
          </label>
          <textarea
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description for a closer skills match…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white"
          />
        </div>

        <button
          disabled={loading}
          onClick={handleAnalyze}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-[15px] font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Analyzing resume…
            </>
          ) : (
            <>
              Analyze resume
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
