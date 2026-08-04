import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";

export default function Resume() {
  return (
    <WorkspaceLayout rightPanel={<AIChat />}>

      <div className="space-y-6">

        <div>

          <h1 className="text-4xl font-black">
            Resume Optimizer
          </h1>

          <p className="text-gray-400 mt-2">
            Improve your resume using AI recommendations.
          </p>

        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111827] p-10">

          <h2 className="text-2xl font-bold">
            Resume Optimization
          </h2>

          <p className="mt-4 text-gray-400">
            This page will contain:
          </p>

          <ul className="mt-6 space-y-3 text-gray-300">

            <li>• ATS Keyword Optimization</li>

            <li>• Missing Skills Detection</li>

            <li>• Resume Improvements</li>

            <li>• AI Suggestions</li>

            <li>• One Click Optimize</li>

          </ul>

        </div>

      </div>

    </WorkspaceLayout>
  );
}