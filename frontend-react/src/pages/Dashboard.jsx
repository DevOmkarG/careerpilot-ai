import { useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";

import { exportResumeReport } from "../utils/exportPDF";

import {
  Sparkles,
  Download,
  Share2,
  Bot,
  Briefcase,
  Rocket,
  Compass,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
+

// ---------- Signature element: a light instrument-style radial gauge ----------
function RadialGauge({ value = 0, label, unit = "%", accent = "blue", size = 128 }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(100, Math.max(0, value));
  const offset = c - (pct / 100) * c;

  const palette = {
    blue: "#2563EB",
    teal: "#0D9488",
  };
  const ring = palette[accent] ?? palette.blue;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r + stroke / 2 + 5}
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray="1 6.2"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#EEF2F6"
            strokeWidth={stroke}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={ring}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            fill="none"
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold tabular-nums text-slate-900 [font-family:'Sora',sans-serif]">
            {Math.round(pct)}
          </span>
          <span className="text-[10px] text-slate-400">{unit}</span>
        </div>
      </div>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
    </div>
  );
}

// ---------- Lightweight trend line, no charting dependency ----------
function Sparkline({ data = [], accent = "#2563EB", height = 56 }) {
  if (!data.length) return null;
  const w = 320;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pt = (d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w;
    const y = height - ((d - min) / span) * height;
    return [x, y];
  };
  const points = data.map((d, i) => pt(d, i));
  const last = points[points.length - 1];

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-14 w-full overflow-visible">
      <polyline
        points={points.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r="4" fill={accent} />
    </svg>
  );
}

function Panel({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-7 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function PanelHeader({ eyebrow, title, sub, right }) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-wide text-blue-600">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
          {title}
        </h2>
        {sub && <p className="mt-1 text-sm text-slate-500">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export default function Dashboard() {
  const { state } = useLocation();

  const storedData = localStorage.getItem("resumeAnalysis");
  const parsedData = storedData ? JSON.parse(storedData) : null;

  const dashboardData = state || parsedData;

  if (!dashboardData) {
    return <Navigate to="/upload" replace />;
  }

  const trend =
    dashboardData.score_trend && dashboardData.score_trend.length
      ? dashboardData.score_trend
      : [dashboardData.ats_score ?? 0].filter(Boolean);

  const readinessTone =
    typeof dashboardData.confidence_score === "number" &&
    dashboardData.confidence_score >= 70
      ? { Icon: ShieldCheck, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" }
      : { Icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };

  const quickActions = [
    {
      title: "Export report",
      desc: "Download the full ATS breakdown as a PDF.",
      icon: Download,
      onClick: () => exportResumeReport(state),
    },
    {
      title: "Share report",
      desc: "Send this analysis with a share link.",
      icon: Share2,
      onClick: () => {},
    },
    {
      title: "Ask AI copilot",
      desc: "Open CareerPilot's assistant for follow-ups.",
      icon: Bot,
      onClick: () => {},
    },
    {
      title: "Analyze another resume",
      desc: "Upload a new file to compare scores.",
      icon: Rocket,
      onClick: () => (window.location.href = "/"),
    },
  ];

  return (
    <WorkspaceLayout>
      <div className="space-y-8">
        {/* HERO — instrument cluster */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div
            className="absolute -right-40 -top-40 h-96 w-96 rounded-full opacity-[0.5] motion-reduce:animate-none"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, #2563EB22 40deg, transparent 90deg)",
              animation: "spin 14s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

          <div className="relative grid gap-10 p-8 md:p-10 xl:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
                <Compass size={14} />
                Flight check complete
              </div>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 [font-family:'Sora',sans-serif] md:text-5xl">
                Your resume, instrument-checked
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
                Here's where{" "}
                <span className="font-medium text-slate-700">
                  {dashboardData.filename ?? "your resume"}
                </span>{" "}
                stands right now — ATS readability, hiring-manager confidence, and what to fix next.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => exportResumeReport(dashboardData)}
                  className="flex h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Download size={16} />
                  Export report
                </button>
                <button className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-6 font-medium text-slate-600 transition hover:bg-slate-50">
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-slate-100 bg-slate-50 p-8">
              <RadialGauge value={dashboardData.ats_score} label="ATS score" accent="blue" />
              <RadialGauge value={dashboardData.confidence_score} label="Confidence" accent="teal" />
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border ${readinessTone.border} ${readinessTone.bg}`}
                >
                  <readinessTone.Icon size={26} className={readinessTone.color} />
                </div>
                <p className="max-w-[8rem] text-center text-xs leading-tight text-slate-500">
                  {dashboardData.interview_readiness ?? "Readiness pending"}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SUMMARY + DETAILS */}
        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <Panel className="h-full">
              <PanelHeader
                eyebrow="AI summary"
                title="Professional summary"
                sub="Generated from your resume content."
              />
              <p className="text-[15px] leading-8 text-slate-600">{dashboardData.summary}</p>

              {trend.length > 1 && (
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <TrendingUp size={14} className="text-blue-600" />
                    Score trend across analyses
                  </div>
                  <Sparkline data={trend} accent="#2563EB" />
                </div>
              )}
            </Panel>
          </div>

          <div className="xl:col-span-4">
            <Panel className="h-full">
              <PanelHeader title="Resume details" />
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-400">File</p>
                  <p className="mt-1.5 truncate font-medium text-slate-800">
                    {dashboardData.filename}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">Characters</p>
                    <p className="mt-1.5 text-2xl font-bold text-slate-800">
                      {dashboardData.characters_found}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-400">Skills found</p>
                    <p className="mt-1.5 text-2xl font-bold text-teal-600">
                      {dashboardData.skills_detected?.length ?? 0}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-400">
                  <span>Analyzed</span>
                  <span className="text-slate-600">Today</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
              Quick actions
            </h2>
            <p className="mt-1 text-sm text-slate-500">Frequently used resume tools.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.title}
                  onClick={action.onClick}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-800">{action.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-500">{action.desc}</p>
                  <ArrowUpRight
                    size={16}
                    className="mt-3 text-slate-300 opacity-0 transition group-hover:opacity-100"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* SKILLS */}
        <div className="grid gap-6 xl:grid-cols-2">
          <Panel>
            <PanelHeader
              title="Skills detected"
              sub="Technologies found in your resume."
              right={
                <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                  {dashboardData.skills_detected?.length ?? 0}
                </span>
              }
            />
            <div className="flex flex-wrap gap-2.5">
              {dashboardData.skills_detected?.map((skill, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-teal-200 bg-teal-50 px-3.5 py-2 text-sm text-teal-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="Missing skills"
              sub="Worth adding to strengthen your match."
              right={
                <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                  {dashboardData.missing_skills?.length ?? 0}
                </span>
              }
            />
            {dashboardData.missing_skills?.length ? (
              <div className="flex flex-wrap gap-2.5">
                {dashboardData.missing_skills.map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm text-red-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-teal-600">Nothing missing — full coverage.</p>
            )}
          </Panel>
        </div>

        {/* RECOMMENDATIONS */}
        <Panel>
          <PanelHeader
            eyebrow="Priority order"
            title="AI recommendations"
            sub="Highest-impact fixes, in the order to tackle them."
            right={
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                {dashboardData.suggestions?.length ?? 0}
              </span>
            }
          />
          <div className="space-y-3">
            {dashboardData.suggestions?.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:bg-slate-100/70"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-amber-200 bg-amber-50 text-sm font-bold text-amber-700">
                  {i + 1}
                </div>
                <p className="text-[15px] leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </Panel>

        {/* CAREER PATHS */}
        <Panel>
          <PanelHeader title="Career paths" sub="Roles that best match your resume." />
          <div className="space-y-3">
            {dashboardData.career_paths?.map((career, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-5 transition hover:border-teal-200 hover:bg-teal-50/40"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{career}</h3>
                    <p className="mt-0.5 text-sm text-slate-500">Matched by AI confidence</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-slate-300" />
              </div>
            ))}
          </div>
        </Panel>

        {/* FINAL CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-10 shadow-sm md:p-12">
          <div className="relative flex flex-col items-start justify-between gap-8 xl:flex-row xl:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
                <Sparkles size={14} />
                CareerPilot AI
              </div>
              <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight text-slate-900 [font-family:'Sora',sans-serif] md:text-4xl">
                Land more interviews with a sharper resume
              </h2>
              <p className="mt-4 max-w-lg text-slate-500">
                Fix what's holding your score back, close the skills gap, and re-check your
                progress any time.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 xl:w-auto">
              <button
                onClick={() => (window.location.href = "/")}
                className="rounded-xl bg-blue-600 px-8 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Analyze another resume
              </button>
              <button
                onClick={() => exportResumeReport(dashboardData)}
                className="rounded-xl border border-slate-200 px-8 py-3.5 font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Download report
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="flex flex-col items-center justify-between gap-6 border-t border-slate-100 py-8 lg:flex-row">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              CareerPilot
            </h3>
            <p className="mt-1 text-sm text-slate-400">AI-powered resume intelligence.</p>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <span>Dashboard</span>
            <span>Resume</span>
            <span>Job matcher</span>
            <span>Interview AI</span>
          </div>
          <div className="text-sm text-slate-400">© 2026 CareerPilot</div>
        </footer>
      </div>
    </WorkspaceLayout>
  );
}
