import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Map() {
  const bots = useSelector((state) => state.bots.bots);
  const [svgContent, setSvgContent] = useState(null);
  const [botPositions, setBotPositions] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBotPositions(
        bots.map((bot) => ({
          ...bot,
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [bots]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "image/svg+xml") return;

    const reader = new FileReader();
    reader.onload = () => setSvgContent(reader.result);
    reader.readAsText(file);
  };

  const statusColor = {
    idle: "bg-yellow-400",
    busy: "bg-green-400",
    charging: "bg-blue-400",
    error: "bg-red-400",
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Warehouse Map</h1>
        </div>

        <label className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-sm font-semibold cursor-pointer transition">
          Upload SVG
          <input
            ref={fileInputRef}
            type="file"
            accept=".svg"
            hidden
            onChange={handleFileUpload}
          />
        </label>
      </div>

      <div className="relative bg-slate-900 h-[500px] rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-[linear-gradient(#1e293b_1px,transparent_1px),linear-gradient(90deg,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]" />

        {svgContent ? (
          <div
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            Upload a warehouse SVG layout to view map
          </div>
        )}

        {botPositions.map((bot, i) => (
          <div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              statusColor[bot.status]
            } shadow-lg animate-pulse`}
            style={{
              left: `${bot.x}%`,
              top: `${bot.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={`${bot.name} (${bot.status})`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-slate-300">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full" />
          Active
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          Idle
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-400 rounded-full" />
          Charging
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          Error
        </span>
      </div>
    </div>
  );
}
