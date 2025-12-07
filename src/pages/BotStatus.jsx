import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBotsRandomly } from "../features/bots/botSlice";

const statusStyle = {
  idle: "bg-yellow-500/20 text-yellow-400",
  busy: "bg-green-500/20 text-green-400",
  charging: "bg-blue-500/20 text-blue-400",
  error: "bg-red-500/20 text-red-400",
};

export default function BotStatus() {
  const dispatch = useDispatch();
  const bots = useSelector((state) => state.bots.bots);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateBotsRandomly());
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bot Status</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="bg-slate-900 rounded-xl p-5 shadow-lg hover:shadow-2xl transition duration-300 border border-slate-800"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{bot.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusStyle[bot.status]
                }`}
              >
                {bot.status.toUpperCase()}
              </span>
            </div>

            {/* Battery Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Battery</span>
                <span className="text-white font-semibold">{bot.battery}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${bot.battery}%` }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-sm text-slate-300">
              <p className="flex justify-between">
                <span>Speed</span>
                <span className="text-white font-semibold">{bot.speed}</span>
              </p>

              <p className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                Last Updated:
                <span className="ml-2 text-white">
                  {new Date(bot.lastUpdated).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
