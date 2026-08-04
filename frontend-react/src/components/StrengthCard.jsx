import { BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function StrengthCard({
  strengths = [],
}) {
  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

      <div className="flex items-center gap-3 mb-8">

        <BadgeCheck
          className="text-green-400"
        />

        <h2 className="text-2xl font-black">

          Strengths

        </h2>

      </div>

      <div className="space-y-5">

        {

          strengths.map((item,index)=>(

            <motion.div

              key={index}

              initial={{
                opacity:0,
                x:-20,
              }}

              animate={{
                opacity:1,
                x:0,
              }}

              transition={{
                delay:index*.08,
              }}

              className="rounded-2xl bg-green-500/10 border border-green-500/20 px-5 py-4"

            >

              {item}

            </motion.div>

          ))

        }

      </div>

    </div>
  );
}