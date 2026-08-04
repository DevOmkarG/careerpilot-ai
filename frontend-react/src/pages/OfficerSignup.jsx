import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Building2, Copy, Check } from "lucide-react";

const API = "http://127.0.0.1:8000";

export default function OfficerSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college_name: "",
    college_code: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [createdCode, setCreatedCode] = useState(null);
  const [copied, setCopied] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/officer/signup`, form);
      if (!res.data.success) {
        showToast(res.data.message || "Signup failed");
      } else {
        setCreatedCode(res.data.college_code);
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong");
    }
    setLoading(false);
  }

  function copyCode() {
    navigator.clipboard.writeText(createdCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Success screen — shown once, after the officer account is created
  if (createdCode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 [font-family:'Inter',sans-serif]">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
            <Check size={26} className="text-teal-600" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            College registered!
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            Share this code with your students — they'll enter it during signup
            so their resume analyses show up on your dashboard.
          </p>

          <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">
            <span className="font-mono text-lg font-bold text-slate-800">{createdCode}</span>
            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <Copy size={15} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            Go to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 [font-family:'Inter',sans-serif]">
      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <Building2 size={22} className="text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Register your college
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            For placement officers &amp; training coordinators
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Your name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Work email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">College name</label>
              <input
                name="college_name"
                placeholder="e.g. ICEEM College"className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
                value={form.college_name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Choose a college code
              </label>
              <input
                name="college_code"
                placeholder="e.g. ICEEM2026"
                value={form.college_code}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:bg-white transition font-mono"
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Students will enter this code during signup to join your college.
              </p>
            </div>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Register college"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
