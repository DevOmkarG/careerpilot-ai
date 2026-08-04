import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import { Bot, Sparkles } from "lucide-react";

export default function InterviewPage() {
  return (
    <WorkspaceLayout rightPanel={<AIChat />}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Interview AI
          </h1>
          <p className="text-slate-500 mt-2">Practice mock interviews with real-time AI feedback.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <Bot size={26} className="text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mt-6">
            Mock interview simulator — coming soon
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
            We're building a voice-based AI interviewer that scores your answers on clarity,
            structure, and confidence.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold text-amber-700">
            <Sparkles size={13} />
            Included free in Pro
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
