import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ConfidenceCard({
  score = 0,
}) {
  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

      <div className="flex justify-between">

        <div>

          <p className="text-gray-400">

            Confidence

          </p>

          <h1 className="text-5xl font-black mt-3">

            {score}%

          </h1>

        </div>

        <ShieldCheck
          size={42}
          className="text-green-400"
        />

      </div>

      <div className="mt-8 h-3 rounded-full bg-slate-800 overflow-hidden">

        <motion.div

          initial={{ width: 0 }}

          animate={{
            width: `${score}%`,
          }}

          transition={{
            duration: 1,
          }}

          className="h-full bg-gradient-to-r from-green-400 to-emerald-500"

        />

      </div>

    </div>
  );
}