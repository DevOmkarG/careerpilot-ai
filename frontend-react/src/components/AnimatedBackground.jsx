import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      <motion.div

        animate={{
          x:[0,200,0],
          y:[0,-150,0],
        }}

        transition={{
          duration:18,
          repeat:Infinity,
        }}

        className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px]"

      />

      <motion.div

        animate={{
          x:[200,-150,200],
          y:[0,200,0],
        }}

        transition={{
          duration:22,
          repeat:Infinity,
        }}

        className="absolute right-0 top-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]"

      />

    </div>
  );
}