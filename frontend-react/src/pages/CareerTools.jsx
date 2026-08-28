import { useNavigate } from "react-router-dom";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import {
  FileText,
  ScanSearch,
  FileSignature,
  Bot,
  Briefcase,
  Compass,
  ArrowUpRight,
} from "lucide-react";

const tools = [
  { title: "Resume Builder", desc: "Build and refine an ATS-ready resume.", icon: FileText, to: "/resume" },
  { title: "ATS Scanner", desc: "Check how well your resume parses.", icon: ScanSearch, to: "/resume" },
  { title: "Cover Letter", desc: "Generate a tailored cover letter in seconds.", icon: FileSignature, to: "/cover-letter" },
  { title: "Interview AI", desc: "Practice with an AI mock interviewer.", icon: Bot, to: "/interview" },
  { title: "Job Matcher", desc: "See how your resume matches a role.", icon: Briefcase, to: "/job-matcher" },
  { title: "Career Roadmap", desc: "Get a personalized growth plan.", icon: Compass, to: "/dashboard" },
];

export default function CareerTools() {
  const navigate = useNavigate();

  return (
    <WorkspaceLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Career Tools
          </h1>
          <p className="text-slate-500 mt-2">Everything you need for your career, in one place.</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.title}
                onClick={() => navigate(tool.to)}
                className="group text-left rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={20} />
                </div>
                <h2 className="font-bold text-lg text-slate-800 mt-5">{tool.title}</h2>
                <p className="mt-1.5 text-sm text-slate-500 leading-6">{tool.desc}</p>
                <ArrowUpRight
                  size={16}
                  className="mt-4 text-slate-300 opacity-0 transition group-hover:opacity-100"
                />
              </button>
            );
          })}
        </div>
      </div>
    </WorkspaceLayout>
  );
}
