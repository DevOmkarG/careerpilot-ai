import { Award } from "lucide-react";

export default function ResumeLevelCard({
  level = "Professional",
}) {
  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

      <Award
        size={42}
        className="text-cyan-400"
      />

      <p className="mt-6 text-gray-400">

        Resume Level

      </p>

      <h2 className="mt-4 text-3xl font-black">

        {level}

      </h2>

    </div>
  );
}