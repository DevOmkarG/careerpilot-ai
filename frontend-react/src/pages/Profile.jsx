import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import {
  User,
  Mail,
  Briefcase,
  Award,
  FileText,
  Sparkles,
  Edit,
} from "lucide-react";

export default function Profile() {
  const name = localStorage.getItem("name") || "Guest User";

  return (
    <WorkspaceLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-9">
          <div className="flex justify-between items-center flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User size={36} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
                  {name}
                </h1>
                <p className="text-slate-500 mt-1.5">CareerPilot Member</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition">
              <Edit size={17} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: Award, value: "12", label: "Resume Analyses", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Sparkles, value: "91%", label: "Best ATS Score", color: "text-teal-600", bg: "bg-teal-50" },
            { icon: Briefcase, value: "18", label: "Skills Identified", color: "text-amber-600", bg: "bg-amber-50" },
            { icon: FileText, value: "7", label: "Career Matches", color: "text-slate-600", bg: "bg-slate-100" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-2xl bg-white border border-slate-200 shadow-sm p-7">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.bg}`}>
                  <Icon className={s.color} size={19} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mt-5 [font-family:'Sora',sans-serif]">
                  {s.value}
                </h2>
                <p className="text-slate-500 mt-1.5 text-sm">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Personal Info */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-9">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 [font-family:'Sora',sans-serif]">
            Personal Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-500">Full Name</label>
              <div className="mt-2 rounded-xl bg-slate-50 border border-slate-100 p-4 text-slate-800">
                {name}
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-500">Email</label>
              <div className="mt-2 rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center gap-2.5 text-slate-800">
                <Mail size={16} className="text-slate-400" />
                user@email.com
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-500">Current Role</label>
              <div className="mt-2 rounded-xl bg-slate-50 border border-slate-100 p-4 text-slate-800">
                Software Developer
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-500">Experience</label>
              <div className="mt-2 rounded-xl bg-slate-50 border border-slate-100 p-4 text-slate-800">
                Fresher
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-9">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 [font-family:'Sora',sans-serif]">
            Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              "Uploaded 10+ Resumes",
              "Reached 90% ATS Score",
              "AI Resume Optimized",
              "Interview Ready",
              "Career Recommendations",
              "Professional Resume",
            ].map((item) => (
              <div key={item} className="rounded-xl bg-blue-50 border border-blue-100 p-5">
                <Award className="text-blue-600 mb-4" size={20} />
                <h3 className="font-semibold text-slate-800 text-sm">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}
