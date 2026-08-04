import { useState } from "react";
import { X } from "lucide-react";

export default function AddJobModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    date: "",
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
    setForm({ company: "", role: "", location: "", salary: "", date: "" });
  }

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-xl p-8">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Add Job
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
            required
          />
          <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
            required
          />
          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
            required
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
