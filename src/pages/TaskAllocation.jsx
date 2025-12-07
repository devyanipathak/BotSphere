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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.pickup || !form.drop) return;

    dispatch(addTask(form));

    setForm({
      pickup: "",
      drop: "",
      priority: "medium",
      comments: "",
    });
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg shadow-xl border border-slate-800">
        <h1 className="text-2xl font-bold mb-6 text-white">
          Task Allocation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="pickup"
            value={form.pickup}
            onChange={handleChange}
            placeholder="Pickup Location"
            className="w-full p-3 rounded bg-slate-800 text-white outline-none"
          />

          <input
            type="text"
            name="drop"
            value={form.drop}
            onChange={handleChange}
            placeholder="Drop Location"
            className="w-full p-3 rounded bg-slate-800 text-white outline-none"
          />

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
            placeholder="Additional Comments"
            className="w-full p-3 rounded bg-slate-800 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold text-white"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}
