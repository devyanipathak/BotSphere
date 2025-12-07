import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function Map() {
  const bots = useSelector((state) => state.bots.bots);
  const [svgContent, setSvgContent] = useState(null);
  const [botPositions, setBotPositions] = useState([]);
  const fileInputRef = useRef(null);

  // Random bot movement every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBotPositions(
        bots.map(() => ({
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [bots]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSvgContent(reader.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Warehouse Map (Bonus)</h1>

      {/* Upload Section */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
        <p className="text-slate-300 text-sm">
          Upload warehouse layout (SVG only)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".svg"
          onChange={handleFileUpload}
          className="text-sm text-white"
        />
      </div>

      {/* Map Container */}
      <div className="relative bg-slate-900 rounded-xl border border-slate-800 p-4 h-[500px] overflow-hidden">
        {/* SVG Layout */}
        {svgContent ? (
          <div
            className="absolute inset-0"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500">
            Upload an SVG layout to display the warehouse
          </div>
        )}

        {/* Moving Bots */}
        {botPositions.map((pos, index) => (
          <div
            key={bots[index]?.id || index}
            className="absolute w-4 h-4 bg-indigo-500 rounded-full shadow-lg border-2 border-white animate-pulse"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={bots[index]?.name}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-indigo-500 rounded-full" />
          Bot Position
        </div>
        <div className="text-slate-400">
          * Bot movement is simulated randomly
        </div>
      </div>
    </div>
  );
}
