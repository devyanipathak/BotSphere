import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError("All fields are required");
      return;
    }

    if (isLogin) {
      dispatch(login({ email: form.email }));
      navigate("/dashboard");
    } else {
      // Simulated signup
      setSuccess("Signup successful! You can now login.");
      setIsLogin(true);
      setForm({ name: "", email: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      <div className="bg-slate-900 p-8 rounded-2xl w-[360px] shadow-2xl border border-slate-800 animate-fade-in">
        
        {/* Logo & Branding */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">🤖</div>
          <h1 className="text-2xl font-bold tracking-wide">BotSphere</h1>
          <p className="text-sm text-slate-400">
            Warehouse Automation Dashboard
          </p>
        </div>

        {/* Toggle */}
        <div className="flex mb-6 bg-slate-800 rounded-lg overflow-hidden">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
              setSuccess("");
            }}
            className={`w-1/2 py-2 text-sm font-semibold transition ${
              isLogin
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
              setSuccess("");
            }}
            className={`w-1/2 py-2 text-sm font-semibold transition ${
              !isLogin
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center animate-shake">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 text-sm mb-3 text-center animate-fade-in">
            {success}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-2.5 rounded font-semibold text-white transition hover:scale-[1.02]"
          >
            {isLogin ? "Login to BotSphere" : "Create BotSphere Account"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-400 mt-5">
          * Authentication is simulated for assignment demo
        </p>
      </div>
    </div>
  );
}
