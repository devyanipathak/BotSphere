import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import BotStatus from "./pages/BotStatus";
import TaskAllocation from "./pages/TaskAllocation";
import TaskQueue from "./pages/TaskQueue";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import Map from "./pages/Map";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Routes>
        <Route path="/" element={<AuthPage />} />

        {[
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/bots", element: <BotStatus /> },
          { path: "/tasks/new", element: <TaskAllocation /> },
          { path: "/tasks/queue", element: <TaskQueue /> },
          { path: "/analytics", element: <Analytics /> },
          { path: "/map", element: <Map /> },
        ].map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  {route.element}
                </>
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
