import { useCheckInContext } from "../context/useCheckInContext";
import type { Mood } from "../types";

const moodEmoji: Record<Mood, string> = {
  great: "🤩",
  good: "😊",
  okay: "😐",
  tired: "😴",
  stressed: "😰",
};

export default function Dashboard() {
  const { todayCheckIns, stats } = useCheckInContext();

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>Antal check-ins idag: {stats.totalCheckIns}</div>
      <div>Genomsnittlig energi: {stats.averageEnergy.toFixed(1)}</div>

      <div>
        <h3>Humörfördelning</h3>
        <ul>
          {Object.entries(stats.moodDistribution).map(([m, count]) => (
            <li key={m}>
              {moodEmoji[m as Mood]} {m}: {count}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Dagens check-ins</h3>
        <ul style={{ display: "grid", gap: 8 }}>
          {todayCheckIns.map((c) => (
            <li key={c.id}>
              <strong>{c.name}</strong> — {moodEmoji[c.mood]} {c.mood} — energi {c.energy}
              {c.comment ? <div>{c.comment}</div> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
