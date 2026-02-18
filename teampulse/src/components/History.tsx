import { useMemo, useRef } from "react";
import { useCheckInContext } from "../context/useCheckInContext";

function toDateKey(d: Date) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function History() {
  const { checkIns, clearDay } = useCheckInContext();
  const listRef = useRef<HTMLUListElement | null>(null);

  const sorted = useMemo(() => {
    return [...checkIns].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [checkIns]);

  const todayKey = toDateKey(new Date());

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => listRef.current?.scrollTo({ top: 0, behavior: "smooth" })}>
          Scroll to top
        </button>
        <button onClick={() => clearDay(todayKey)}>Rensa dagens data</button>
      </div>

      <ul ref={listRef} style={{ maxHeight: 320, overflow: "auto", padding: 0, margin: 0 }}>
        {sorted.map((c) => (
          <li key={c.id} style={{ listStyle: "none", padding: 8, borderBottom: "1px solid #333" }}>
            <div>
              <strong>{c.name}</strong> — {String(new Date(c.timestamp))}
            </div>
            {c.comment ? <div>{c.comment}</div> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
