import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <div className="max-w-5xl text-center">

        <p className="text-blue-400 font-semibold mb-4">
          AI Powered Resume Analyzer
        </p>

        <h1 className="text-6xl font-black leading-tight">

          Build a Resume

          <br />

          Recruiters

          <span className="text-blue-400">
            {" "}Can't Ignore
          </span>

        </h1>

        <p className="mt-8 text-gray-400 text-xl">

          Get ATS Score, Career Category,
          AI Review, Missing Skills and
          Professional Suggestions in Seconds.

        </p>

        <button className="mt-12 bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-2xl text-lg flex items-center gap-3 mx-auto">

          Analyze Resume

          <ArrowRight size={22} />

        </button>

      </div>

    </section>
  );
}