import { useState } from "react";
import CheckInForm from "./components/CheckInForm";
import Dashboard from "./components/Dashboard.tsx";
import History from "./components/History";

type View = "checkin" | "dashboard" | "history";

export default function App() {
  const [activeView, setActiveView] = useState<View>("checkin");

  return (
    <div style={{ padding: 16 }}>
      <h1>TeamPulse</h1>

      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setActiveView("checkin")}>Check-in</button>
        <button onClick={() => setActiveView("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveView("history")}>Historik</button>
      </nav>

      {activeView === "checkin" && <CheckInForm />}
      {activeView === "dashboard" && <Dashboard />}
      {activeView === "history" && <History />}
    </div>
  );
}
