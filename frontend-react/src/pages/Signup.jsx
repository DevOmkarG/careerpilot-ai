import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Compass, Check } from "lucide-react";
import { signupUser } from "../services/api";

const perks = [
  "3 free resume analyses",
  "Instant ATS score",
  "No credit card required",
];

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState("");

  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  college_code: "",
});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signupUser(form);
      console.log("SIGNUP RESPONSE:", res);

      if (!res.success) {
        showToast(res.message || "Signup failed");
        return;
      }

      showToast("Account created");
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      console.log(err);
      showToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 [font-family:'Inter',sans-serif]">

      {toast && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-5 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}

      <div
        className={`w-full max-w-md transition-all duration-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <Compass size={22} className="text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">Join CareerPilot — free to start</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
            {perks.map((p) => (
              <span key={p} className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Check size={13} className="text-teal-600" />
                {p}
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
              <input
                type="text"
                name="name"
                placeholder="Ritesh Deshmukh"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>
            <input
  type="text"
  name="college_code"
  placeholder="College Code (optional)"
  value={form.college_code}
  onChange={handleChange}
  className="w-full bg-[#0b1220]/70 rounded-xl px-5 py-4 border border-white/10 text-white outline-none focus:border-blue-500 transition"
/>

            <button
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create free account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </p>
          <p className="text-center text-gray-500 mt-4 text-sm">
  Placement officer?{" "}
  <Link to="/officer-signup" className="text-blue-400 hover:underline">
    Register your college
  </Link>
</p>
        </div>
      </div>
    </div>
  );
}
