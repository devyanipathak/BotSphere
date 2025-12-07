import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeOldestTask } from "../features/tasks/taskSlice";

const priorityStyle = {
  low: "bg-green-500/20 text-green-400",
  medium: "bg-yellow-500/20 text-yellow-400",
  high: "bg-red-500/20 text-red-400",
};

export default function TaskQueue() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.pendingTasks);

  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev === 1 ? 3 : prev - 1));
    }, 1000);

    const dequeueInterval = setInterval(() => {
      dispatch(removeOldestTask());
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(dequeueInterval);
    };
  }, [dispatch]);

  const sortedTasks = [...tasks].sort((a, b) =>
    a.priority === "high" ? -1 : 1
  );

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Task Queue</h1>
        </div>
        <span className="px-3 py-1 rounded bg-indigo-500 text-xs">LIVE</span>
      </div>

      <div className="space-y-4 max-w-3xl">
        {sortedTasks.length === 0 && (
          <p className="text-slate-400">No pending tasks</p>
        )}

        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-center hover:scale-[1.01] transition"
          >
            <div>
              <p className="font-semibold text-white">
                {task.pickup} → {task.drop}
              </p>
              <p className="text-xs text-slate-400">
                {new Date(task.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-sm text-slate-300 mt-1">
                {task.comments || "No comments"}
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                priorityStyle[task.priority]
              }`}
            >
              {task.priority.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
