import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import { Bot, FileText, Briefcase, Compass, IndianRupee, MapIcon } from "lucide-react";

const topics = [
  { label: "Resume feedback", icon: FileText },
  { label: "Interview prep", icon: Bot },
  { label: "Career guidance", icon: Compass },
  { label: "Salary benchmarking", icon: IndianRupee },
  { label: "Growth roadmap", icon: MapIcon },
];

export default function Copilot() {
  return (
    <WorkspaceLayout rightPanel={<AIChat />}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            AI Copilot
          </h1>
          <p className="text-slate-500 mt-2">Your personal AI career assistant.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Bot size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mt-5">Ask anything about</h2>
          <p className="mt-2 text-slate-500 text-sm">
            The copilot on the right can help with any of these — just start typing.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {topics.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.label}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700"
                >
                  <Icon size={16} className="text-blue-600" />
                  {t.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
