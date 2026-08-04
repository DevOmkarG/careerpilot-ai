import {
  BriefcaseBusiness,
  Calendar,
  MapPin,
  IndianRupee,
  ArrowRight,
} from "lucide-react";

export default function JobCard({ job, currentColumn, columns, onMove }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 hover:border-blue-300 hover:shadow-md transition">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
          <BriefcaseBusiness size={19} className="text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm">{job.company}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{job.role}</p>
        </div>
      </div>

      <div className="space-y-2.5 text-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <MapPin size={14} />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <IndianRupee size={14} />
          {job.salary}
        </div>
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={14} />
          {job.date}
        </div>
      </div>

      <div className="mt-5">
        <select
          value={currentColumn}
          onChange={(e) => onMove(job.id, currentColumn, e.target.value)}
          className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-400"
        >
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <button className="mt-4 w-full rounded-xl bg-blue-50 border border-blue-100 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition">
        <ArrowRight size={15} />
        Update Status
      </button>
    </div>
  );
}
