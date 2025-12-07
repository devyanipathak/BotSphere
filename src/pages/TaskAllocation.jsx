import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

export default function TaskAllocation() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    pickup: "",
    drop: "",
    priority: "medium",
    comments: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.pickup || !form.drop) return;

    dispatch(addTask(form));
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2000);

    setForm({ pickup: "", drop: "", priority: "medium", comments: "" });
  };

  return (
    <div className="p-6 flex justify-center animate-fade-in">
      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-xl border border-slate-800 shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">New Task</h1>
          <p className="text-slate-400 text-sm">
            Assign a task to the BotSphere system
          </p>
        </div>

        {success && (
          <div className="text-green-400 text-sm bg-green-500/10 p-2 rounded animate-fade-in">
            ✅ Task successfully added to queue
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
              placeholder="Pickup Location"
              className="p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="text"
              name="drop"
              value={form.drop}
              onChange={handleChange}
              placeholder="Drop Location"
              className="p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            placeholder="Operator Notes (Optional)"
            className="w-full p-3 rounded bg-slate-800 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded font-semibold transition hover:scale-[1.02]"
          >
            Allocate Task
          </button>
        </form>
      </div>
    </div>
  );
}
