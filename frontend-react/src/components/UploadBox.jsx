import { UploadCloud, FileText, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { uploadResume } from "../services/api";
import { useNavigate } from "react-router-dom";
import AIProcessing from "./AIProcessing";

export default function UploadBox() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  function handleFile(e) {
    if (!e.target.files.length) return;
    setFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  }

  async function handleAnalyze() {
    if (!file) {
      alert("Select your resume first.");
      return;
    }
    try {
      setLoading(true);
      const data = await uploadResume(file);
      navigate("/dashboard", { state: data });
    } catch (err) {
      console.error(err);
      alert("Couldn't reach the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && <AIProcessing />}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-10">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10">
                <Sparkles size={32} className="text-amber-400" />
              </div>
            </div>

            <h2 className="mt-7 text-center text-3xl font-bold text-gray-50">
              AI resume analyzer
            </h2>
            <p className="mx-auto mt-3 max-w-md text-center text-gray-500">
              Upload your resume and CareerPilot will score your ATS match, skills, and
              career fit.
            </p>

            <label
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              className={`mt-9 block cursor-pointer rounded-2xl border-2 border-dashed p-12 transition ${
                dragActive
                  ? "border-amber-400 bg-amber-500/5"
                  : "border-white/10 hover:border-amber-500/30"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFile}
              />
              <div className="flex flex-col items-center">
                <UploadCloud size={48} className="text-gray-500" />
                <h3 className="mt-5 text-lg font-medium text-gray-300">
                  {file ? file.name : "Click or drop your resume here"}
                </h3>
                <p className="mt-2 text-sm text-gray-600">PDF · DOC · DOCX</p>
              </div>
            </label>

            {file && (
              <div className="mt-5 flex items-center justify-between rounded-xl border border-teal-500/20 bg-teal-500/[0.06] p-4">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText size={18} className="flex-shrink-0 text-teal-400" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-100">{file.name}</p>
                    <p className="text-xs text-gray-500">Ready for analysis</p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="flex-shrink-0 rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-gray-300"
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-amber-500 py-4 text-base font-semibold text-[#0B0F17] transition hover:bg-amber-400 disabled:opacity-70"
            >
              {loading ? "CareerPilot is thinking…" : "Analyze with AI"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
