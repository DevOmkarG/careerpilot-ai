import { useState, useEffect } from "react";

import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";

import JobColumn from "../components/application/JobColumn";
import AddJobModal from "../components/application/AddJobModal";
import axios from "axios";

import { Plus } from "lucide-react";

const initialJobs = {
  Applied: [
    {
      id: crypto.randomUUID(),
      company: "Google",
      role: "Frontend Developer",
      location: "Bangalore",
      salary: "18 LPA",
      date: "12 Jul",
    },
  ],
  Screening: [
    {
      id: crypto.randomUUID(),
      company: "Amazon",
      role: "SDE-1",
      location: "Hyderabad",
      salary: "22 LPA",
      date: "15 Jul",
    },
  ],
  Interview: [],
  Offer: [],
  Rejected: [],
};

const API = "https://careerpilot-ai-skk5.onrender.com";

export default function ApplicationTracker() {
  const [jobs, setJobs] = useState(initialJobs);
  const [open, setOpen] = useState(false);

  async function addJob(job) {
    try {
      const res = await axios.post(`${API}/applications`, job);
      setJobs((prev) => ({
        ...prev,
        Applied: [...prev.Applied, res.data],
      }));
    } catch (err) {
      console.error(err);
    }
  }

  function moveJob(id, from, to) {
    if (from === to) return;
    const source = [...jobs[from]];
    const destination = [...jobs[to]];
    const index = source.findIndex((j) => j.id === id);
    if (index === -1) return;
    const [removed] = source.splice(index, 1);
    destination.push(removed);
    setJobs({ ...jobs, [from]: source, [to]: destination });
  }

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await axios.get(`${API}/applications`);
        const grouped = {
          Applied: [],
          Screening: [],
          Interview: [],
          Offer: [],
          Rejected: [],
        };
        res.data.forEach((job) => {
          const status = job.status || "Applied";
          grouped[status].push(job);
        });
        setJobs(grouped);
      } catch (err) {
        console.error(err);
      }
    }
    loadJobs();
  }, []);

  return (
    <WorkspaceLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
              Application Tracker
            </h1>
            <p className="text-slate-500 mt-2">
              Manage all your applications professionally.
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Job
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
          <JobColumn title="Applied" jobs={jobs.Applied} columns={Object.keys(jobs)} onMove={moveJob} />
          <JobColumn title="Screening" jobs={jobs.Screening} columns={Object.keys(jobs)} onMove={moveJob} />
          <JobColumn title="Interview" jobs={jobs.Interview} columns={Object.keys(jobs)} onMove={moveJob} />
          <JobColumn title="Offer" jobs={jobs.Offer} columns={Object.keys(jobs)} onMove={moveJob} />
          <JobColumn title="Rejected" jobs={jobs.Rejected} columns={Object.keys(jobs)} onMove={moveJob} />
        </div>

        <AddJobModal
          open={open}
          onClose={() => setOpen(false)}
          onSave={(job) => {
            addJob(job);
            setOpen(false);
          }}
        />
      </div>
    </WorkspaceLayout>
  );
}
