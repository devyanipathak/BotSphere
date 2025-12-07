import { useSelector } from "react-redux";
import StatCard from "../components/StatCard";
import { FaRobot, FaTasks, FaBatteryHalf, FaExclamationTriangle, FaClock } from "react-icons/fa";

export default function Dashboard() {
  const bots = useSelector((state) => state.bots.bots);
  const pendingTasks = useSelector((state) => state.tasks.pendingTasks);

  const totalBots = bots.length;
  const activeBots = bots.filter((b) => b.status === "busy").length;
  const idleBots = bots.filter((b) => b.status === "idle").length;
  const errorBots = bots.filter((b) => b.status === "error").length;
  const pendingCount = pendingTasks.length;

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">BotSphere • Operations Overview</h1>
        <p className="text-slate-400 text-sm">
          Real-time warehouse activity snapshot
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Total Bots" value={totalBots} color="blue" icon={<FaRobot />} />
        <StatCard title="Active Bots" value={activeBots} color="green" icon={<FaTasks />} />
        <StatCard title="Idle Bots" value={idleBots} color="yellow" icon={<FaClock />} />
        <StatCard title="Bots in Error" value={errorBots} color="red" icon={<FaExclamationTriangle />} />
        <StatCard title="Pending Tasks" value={pendingCount} color="purple" icon={<FaBatteryHalf />} />
      </div>
    </div>
  );
}
