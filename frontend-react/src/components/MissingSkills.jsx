import { CircleAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function MissingSkills({
  skills = [],
}) {
  return (
    <div className="rounded-3xl bg-[#111827] border border-white/10 p-8">

      <div className="flex items-center gap-3 mb-8">

        <CircleAlert
          className="text-red-400"
        />

        <h2 className="text-2xl font-black">

          Missing Skills

        </h2>

      </div>

      {

        skills.length === 0 ?

        <div className="text-green-400 font-semibold">

          Excellent! No missing skills detected.

        </div>

        :

        <div className="flex flex-wrap gap-4">

          {

            skills.map((skill,index)=>(

              <motion.div

                key={index}

                whileHover={{
                  scale:1.05,
                }}

                className="px-5 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300"

              >

                {skill}

              </motion.div>

            ))

          }

        </div>

      }

    </div>
  );
}