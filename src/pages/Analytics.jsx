import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#22c55e", "#eab308", "#3b82f6", "#ef4444"];

export default function Analytics() {
  const bots = useSelector((state) => state.bots.bots);
  const tasks = useSelector((state) => state.tasks.pendingTasks);

  const statusData = [
    { name: "Idle", value: bots.filter((b) => b.status === "idle").length },
    { name: "Busy", value: bots.filter((b) => b.status === "busy").length },
    {
      name: "Charging",
      value: bots.filter((b) => b.status === "charging").length,
    },
    { name: "Error", value: bots.filter((b) => b.status === "error").length },
  ];

  const priorityData = [
    {
      priority: "Low",
      count: tasks.filter((t) => t.priority === "low").length,
    },
    {
      priority: "Medium",
      count: tasks.filter((t) => t.priority === "medium").length,
    },
    {
      priority: "High",
      count: tasks.filter((t) => t.priority === "high").length,
    },
  ];

  return (
    <div className="p-6 space-y-10 animate-fade-in">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Insights</h1>
        </div>
        <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 text-xs">
          LIVE DATA
        </span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-300">
        <span>🟢 Active/Healthy</span>
        <span>🟡 Idle/Medium</span>
        <span>🔵 Charging</span>
        <span>🔴 Error</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 h-[360px]">
          <h2 className="text-lg mb-4 font-semibold">
            Bot Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 h-[360px]">
          <h2 className="text-lg mb-4 font-semibold">Task Load by Priority</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <XAxis dataKey="priority" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
