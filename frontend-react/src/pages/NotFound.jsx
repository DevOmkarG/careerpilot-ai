import { useNavigate } from "react-router-dom";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center [font-family:'Inter',sans-serif]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
        <Compass size={26} className="text-blue-600" />
      </div>
      <h1 className="mt-8 text-6xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">404</h1>
      <h2 className="mt-3 text-xl font-bold text-slate-800">You've drifted off course</h2>
      <p className="mt-2 text-slate-500 max-w-sm">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
      >
        <ArrowLeft size={16} />
        Back to home
      </button>
    </div>
  );
}
