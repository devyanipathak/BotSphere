const colorMap = {
  blue: "from-blue-500 to-blue-700",
  green: "from-green-500 to-green-700",
  yellow: "from-yellow-400 to-yellow-600",
  red: "from-red-500 to-red-700",
  purple: "from-purple-500 to-purple-700",
};

export default function StatCard({ title, value, icon, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} p-6 rounded-xl shadow-lg hover:scale-[1.03] transition transform text-white`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </div>
  );
}
