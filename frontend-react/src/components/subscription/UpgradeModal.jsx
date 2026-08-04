import { X, Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const proFeatures = [
  "Unlimited resume analyses",
  "AI cover letter generator",
  "Unlimited job matching",
  "Mock interview simulator",
];

// Call setOpen(true) whenever a gated API call returns a 402 / "limit_reached"
// response. Example in any page:
//
//   try {
//     await analyzeResume(file);
//   } catch (err) {
//     if (err.response?.status === 402) setUpgradeOpen(true);
//   }
export default function UpgradeModal({ open, onClose }) {
  const navigate = useNavigate();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
        >
          <X size={18} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
          <Sparkles size={20} className="text-amber-600" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
          You've used all 3 free analyses
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Upgrade to Pro for unlimited resume analyses and the full CareerPilot toolkit.
        </p>

        <ul className="mt-6 space-y-2.5">
          {proFeatures.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
              <Check size={15} className="text-teal-600" />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/settings?upgrade=1")}
          className="mt-7 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Upgrade to Pro — ₹499/month
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full rounded-xl py-3 text-sm font-medium text-slate-400 hover:text-slate-600"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
