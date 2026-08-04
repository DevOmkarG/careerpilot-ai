import JobCard from "./JobCard";

export default function JobColumn({ title, jobs, columns, onMove }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 min-h-[600px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-slate-800">{title}</h2>
        <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 text-sm font-semibold">
          {jobs.length}
        </span>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            currentColumn={title}
            columns={columns}
            onMove={onMove}
          />
        ))}

        {jobs.length === 0 && (
          <p className="text-center text-xs text-slate-400 py-10">No jobs here yet</p>
        )}
      </div>
    </div>
  );
}
