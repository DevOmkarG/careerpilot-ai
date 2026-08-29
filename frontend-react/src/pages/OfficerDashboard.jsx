import { useEffect, useState } from "react";
import axios from "axios";
import {
  Building2,
  Users,
  TrendingUp,
  Search,
  Download,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

const API = "https://careerpilot-ai-skk5.onrender.com";

export default function OfficerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const res = await axios.get(`${API}/officer/students`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400">
        Loading college data...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Could not load dashboard. Make sure you're logged in as a placement officer.
      </div>
    );
  }

  const filtered = data.students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const avgScore =
    data.students.filter((s) => s.latest_ats_score != null).length > 0
      ? Math.round(
          data.students
            .filter((s) => s.latest_ats_score != null)
            .reduce((sum, s) => sum + s.latest_ats_score, 0) /
            data.students.filter((s) => s.latest_ats_score != null).length
        )
      : 0;

  const readyCount = data.students.filter(
    (s) => s.latest_ats_score != null && s.latest_ats_score >= 70
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 [font-family:'Inter',sans-serif]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <Building2 size={26} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
              {data.college_name}
            </h1>
            <p className="text-slate-500 mt-1">
              College Code: <span className="font-mono text-slate-700">{data.college_code}</span>
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
            <Users className="text-blue-600" size={22} />
            <h2 className="text-3xl font-bold text-slate-900 mt-4 [font-family:'Sora',sans-serif]">
              {data.total_students}
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Total Students</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
            <TrendingUp className="text-teal-600" size={22} />
            <h2 className="text-3xl font-bold text-slate-900 mt-4 [font-family:'Sora',sans-serif]">
              {avgScore}%
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Average ATS Score</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
            <ShieldCheck className="text-amber-600" size={22} />
            <h2 className="text-3xl font-bold text-slate-900 mt-4 [font-family:'Sora',sans-serif]">
              {readyCount}
            </h2>
            <p className="text-slate-500 mt-1 text-sm">Interview-Ready (70%+)</p>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">Students</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  placeholder="Search name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-sm outline-none focus:border-blue-400 focus:bg-white w-64"
                />
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                <Download size={15} />
                Export CSV
              </button>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-400">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">ATS Score</th>
                <th className="px-6 py-3 font-medium">Plan</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((s) => {
                  const hasScore = s.latest_ats_score != null;
                  const isReady = hasScore && s.latest_ats_score >= 70;
                  return (
                    <tr key={s.email} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-medium text-slate-800">{s.name}</td>
                      <td className="px-6 py-4 text-slate-500">{s.email}</td>
                      <td className="px-6 py-4">
                        {hasScore ? (
                          <span className="font-semibold text-slate-800">{s.latest_ats_score}%</span>
                        ) : (
                          <span className="text-slate-400">Not analyzed yet</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            s.plan === "pro"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {s.plan === "pro" ? "Pro" : "Free"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {hasScore ? (
                          <span
                            className={`flex items-center gap-1.5 text-xs font-medium ${
                              isReady ? "text-teal-600" : "text-amber-600"
                            }`}
                          >
                            {isReady ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                            {isReady ? "Ready" : "Needs work"}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
