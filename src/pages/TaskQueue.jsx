import { useEffect } from "react";
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

//   Auto-remove one task every 3 seconds
    useEffect(() => {
      const interval = setInterval(() => {
        dispatch(removeOldestTask());
      }, 3000);

      return () => clearInterval(interval);
    }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Task Queue</h1>

      <div className="space-y-4 max-w-3xl">
        {tasks.length === 0 && (
          <p className="text-slate-400">No pending tasks</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-slate-900 p-4 rounded-xl shadow border border-slate-800 flex justify-between items-center"
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
