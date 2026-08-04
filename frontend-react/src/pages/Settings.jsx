import { useState } from "react";
import WorkspaceLayout from "../components/layout/WorkspaceLayout";
import AIChat from "../components/chat/AIChat";
import {
  Settings,
  Moon,
  Bell,
  Shield,
  Save,
  Trash2,
  Crown,
  Check,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <WorkspaceLayout rightPanel={<AIChat />}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
            Settings
          </h1>
          <p className="text-slate-500 mt-2">Manage your CareerPilot preferences.</p>
        </div>

        {/* Subscription */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                <Crown size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Free plan</h2>
                <p className="text-sm text-slate-500">3 resume analyses included</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
              Upgrade to Pro — ₹499/mo
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-blue-200/60 pt-5">
            {["Unlimited analyses", "AI cover letters", "Interview simulator"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Check size={13} className="text-teal-600" />
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-9">
          <div className="flex items-center gap-3 mb-8">
            <Settings size={22} className="text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 [font-family:'Sora',sans-serif]">
              General
            </h2>
          </div>

          <div className="space-y-6">
            <SettingRow icon={<Bell size={19} />} title="Notifications" value={notifications} onChange={setNotifications} />
            <SettingRow icon={<Moon size={19} />} title="Dark mode" value={darkMode} onChange={setDarkMode} />
            <SettingRow icon={<Shield size={19} />} title="Auto-save analysis" value={autoSave} onChange={setAutoSave} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-9">
            <h2 className="text-xl font-bold text-slate-900 mb-6 [font-family:'Sora',sans-serif]">
              Account
            </h2>
            <div className="space-y-4">
              <input
                defaultValue={localStorage.getItem("name")}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
              />
              <input
                defaultValue="user@email.com"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white transition"
              />
              <button className="w-full rounded-xl bg-blue-600 py-3.5 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-red-100 shadow-sm p-9">
            <h2 className="text-xl font-bold text-red-600 mb-6 [font-family:'Sora',sans-serif]">
              Danger Zone
            </h2>
            <p className="text-slate-500 leading-7 text-sm">
              Delete all your resume history permanently. This cannot be undone.
            </p>
            <button className="mt-7 w-full rounded-xl bg-red-50 border border-red-200 py-3.5 text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-2 font-medium">
              <Trash2 size={17} />
              Delete All History
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
}

function SettingRow({ icon, title, value, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <span className="text-[15px] font-medium text-slate-700">{title}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-14 h-8 rounded-full transition ${value ? "bg-blue-600" : "bg-slate-200"}`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow transition ${
            value ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
