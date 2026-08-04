import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FileSignature,
  Briefcase,
  Bot,
  ClipboardList,
  History,
  Wrench,
  User,
  Settings,
  Compass,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import TokenBadge from "../subscription/TokenBadge";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "Resume Optimizer", icon: FileText },
  { to: "/cover-letter", label: "Cover Letter", icon: FileSignature },
  { to: "/job-matcher", label: "Job Matcher", icon: Briefcase },
  { to: "/interview", label: "Interview AI", icon: Bot },
  { to: "/applications", label: "Applications", icon: ClipboardList },
  { to: "/history", label: "History", icon: History },
  { to: "/tools", label: "Career Tools", icon: Wrench },
];

export default function WorkspaceLayout({ children, rightPanel }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const name = typeof window !== "undefined" ? localStorage.getItem("name") : null;

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 [font-family:'Inter',sans-serif]">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 flex h-screen flex-col border-r border-slate-200 bg-white transition-all ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <Compass size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="text-[15px] font-bold text-slate-900 [font-family:'Sora',sans-serif]">
              CareerPilot
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`
                }
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 px-3 py-4 space-y-1">
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >
            <User size={18} />
            {!collapsed && <span>Profile</span>}
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:bg-slate-50"
              }`
            }
          >
            <Settings size={18} />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={18} />
            {!collapsed && <span>Log out</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center border-t border-slate-100 py-3 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <div />
          <div className="flex items-center gap-4">
            <TokenBadge />
            <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {(name || "G")[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700">{name || "Guest"}</span>
            </div>
          </div>
        </header>

        <div className="flex flex-1 gap-6 p-8">
          <main className="min-w-0 flex-1">{children}</main>
          {rightPanel && (
            <aside className="hidden w-[340px] flex-shrink-0 lg:block">{rightPanel}</aside>
          )}
        </div>
      </div>
    </div>
  );
}
