import { useEffect, useState } from "react";

const steps = [
  "Extracting Resume...",
  "Detecting Technical Skills...",
  "Calculating ATS Score...",
  "Finding Missing Skills...",
  "Matching Career Paths...",
  "Generating AI Insights...",
  "Finalizing Report..."
];

export default function AIProcessing() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    if (index >= steps.length - 1) return;

    const timer = setTimeout(() => {

      setIndex(index + 1);

    }, 700);

    return () => clearTimeout(timer);

  }, [index]);

  return (

    <div className="fixed inset-0 bg-[#050816] flex items-center justify-center z-50">

      <div className="w-[600px]">

        <h1 className="text-5xl font-bold text-center mb-3 text-white">

          🤖 CareerPilot AI

        </h1>

        <p className="text-center text-gray-400 mb-12">

          AI is analyzing your resume...

        </p>

        <div className="space-y-5">

          {steps.map((item, i) => (

            <div
              key={i}
              className={`transition-all duration-500 ${
                i <= index
                  ? "text-green-400"
                  : "text-gray-500"
              }`}
            >
              {i <= index ? "✓ " : "• "}
              {item}
            </div>

          ))}

        </div>

      </div>

    </div>

  );

}