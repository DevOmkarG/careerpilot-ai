import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Bot,
  Briefcase,
  History,
  Settings,
  LogOut,
  FileSignature,
  Target,
  KanbanSquare,
  ChevronsLeft,
  ChevronsRight,
  Menu,
  X,
  Compass,
} from "lucide-react";

// Grouped nav — order encodes the workflow: build the resume, find the role,
// win the interview, track the outcome.
const groups = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
  },
  {
    label: "Resume",
    items: [
      { title: "Resume Optimizer", icon: FileText, path: "/resume" },
      { title: "AI Copilot", icon: Bot, path: "/copilot" },
      { title: "Cover Letter", icon: FileSignature, path: "/cover-letter" },
    ],
  },
  {
    label: "Career",
    items: [
      { title: "Job Matcher", icon: Target, path: "/job-matcher" },
      { title: "Career Tools", icon: Briefcase, path: "/career-tools" },
      { title: "Interview AI", icon: Bot, path: "/interview" },
      { title: "Applications", icon: KanbanSquare, path: "/applications" },
    ],
  },
  {
    label: "Activity",
    items: [{ title: "History", icon: History, path: "/history" }],
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const width = collapsed ? "w-20" : "w-72";

  const content = (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col
      border-r border-white/[0.06] bg-[#0D1117] transition-[width] duration-300 ${width}
      ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
    >
      {/* Brand */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10">
            <Compass size={20} className="text-amber-400" />
            <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-teal-400 ring-2 ring-[#0D1117]" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap"
              >
                <h1 className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-gray-100">
                  CareerPilot
                </h1>
                <p className="text-[11px] text-gray-500">Flight deck</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 md:hidden"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-3 py-5 [scrollbar-width:none]">
        {groups.map((group) => (
          <div key={group.label} className="mb-6">
            {!collapsed && (
              <p className="mb-2 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    title={collapsed ? item.title : undefined}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "bg-white/[0.06] text-gray-100"
                          : "text-gray-500 hover:bg-white/[0.03] hover:text-gray-300"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-amber-400 transition-opacity ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        />
                        <Icon
                          size={18}
                          className={`flex-shrink-0 ${isActive ? "text-amber-400" : ""}`}
                        />
                        {!collapsed && (
                          <span className="truncate font-medium">{item.title}</span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Account */}
      <div className="border-t border-white/[0.06] p-3">
        {!collapsed && (
          <div className="mb-2 flex items-center gap-3 rounded-lg bg-white/[0.03] px-3 py-2.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-500/15 font-mono text-xs font-bold text-teal-400">
              OM
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-200">Omkar</p>
              <p className="text-[11px] text-gray-500">Pro plan</p>
            </div>
          </div>
        )}

        <button
          onClick={() => navigate("/settings")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-white/[0.03] hover:text-gray-300"
        >
          <Settings size={18} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Settings</span>}
        </button>
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400/80 transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Log out</span>}
        </button>

        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mt-2 hidden w-full items-center justify-center gap-2 rounded-lg border border-white/[0.06] py-2 text-gray-500 transition-colors hover:text-gray-300 md:flex"
        >
          {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#0D1117] text-gray-300 md:hidden"
        aria-label="Open menu"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>

      {content}

      {/* Spacer so page content isn't hidden under the fixed sidebar on desktop */}
      <div className={`hidden md:block flex-shrink-0 transition-[width] duration-300 ${width}`} />
    </>
  );
}
