import { useEffect, useState } from "react";
import { Zap, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "http://127.0.0.1:8000";

// Drop this anywhere (e.g. WorkspaceLayout header). It reads the user's
// remaining free analyses from the backend and shows an upgrade nudge
// once they run low. Falls back gracefully if the endpoint isn't wired yet.
export default function TokenBadge() {
  const navigate = useNavigate();
  const [tokens, setTokens] = useState(null); // { used, limit, plan }

  useEffect(() => {
    async function loadUsage() {
      try {
        const res = await axios.get(`${API}/me/usage`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTokens(res.data); // expected: { used: 1, limit: 3, plan: "free" }
      } catch (err) {
        // Backend not wired yet — show a safe default instead of breaking the UI
        setTokens({ used: 0, limit: 3, plan: "free" });
      }
    }
    loadUsage();
  }, []);

  if (!tokens) return null;

  if (tokens.plan === "pro") {
    return (
      <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700">
        <Crown size={13} />
        Pro plan
      </div>
    );
  }

  const remaining = Math.max(tokens.limit - tokens.used, 0);
  const isLow = remaining <= 1;

  return (
    <button
      onClick={() => navigate("/settings")}
      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        isLow
          ? "bg-red-50 text-red-600 hover:bg-red-100"
          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
      }`}
    >
      <Zap size={13} />
      {remaining} free {remaining === 1 ? "analysis" : "analyses"} left
    </button>
  );
}
