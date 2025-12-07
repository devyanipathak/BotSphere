import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-400 border-b-2 border-indigo-400 pb-1"
      : "text-slate-300 hover:text-white";

  return (
    <nav className="bg-slate-900 px-8 py-4 flex items-center justify-between shadow-lg border-b border-slate-800">
      <div className="flex items-center gap-2 text-xl font-bold text-white">
        🤖 <span>BotSphere</span>
      </div>

      <div className="flex items-center gap-8 text-sm font-medium">
        <NavLink to="/dashboard" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/bots" className={linkClass}>
          Bots
        </NavLink>
        <NavLink to="/tasks/new" className={linkClass}>
          Task Allocation
        </NavLink>
        <NavLink to="/tasks/queue" className={linkClass}>
          Task Queue
        </NavLink>
        <NavLink to="/analytics" className={linkClass}>
          Analytics
        </NavLink>
        <NavLink to="/map" className={linkClass}>
          Map
        </NavLink>
      </div>
    </nav>
  );
}
