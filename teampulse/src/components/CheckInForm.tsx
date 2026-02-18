import { useState } from "react";
import type { EnergyLevel, Mood } from "../types";
import { useCheckInContext } from "../context/useCheckInContext";

const MOODS: Mood[] = ["great", "good", "okay", "tired", "stressed"];

export default function CheckInForm() {
  const { addCheckIn } = useCheckInContext();

  const [name, setName] = useState("");
  const [mood, setMood] = useState<Mood | "">("");
  const [energy, setEnergy] = useState<EnergyLevel>(3);
  const [comment, setComment] = useState("");

  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) return setError("Namn måste fyllas i.");
    if (!mood) return setError("Humör måste väljas.");

    setError(null);

    addCheckIn({
      name: name.trim(),
      mood: mood as Mood,
      energy,
      comment: comment.trim() ? comment.trim() : undefined,
    });

    // reset
    setName("");
    setMood("");
    setEnergy(3);
    setComment("");
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <div>
        <label>Namn</label>
        <input
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          placeholder="Ditt namn"
        />
      </div>

      <div>
        <label>Humör</label>
        <select
          value={mood}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setMood(e.target.value as Mood | "")
          }
        >
          <option value="">Välj...</option>
          {MOODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Energi: {energy}</label>
        <input
          type="range"
          min={1}
          max={5}
          value={energy}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEnergy(Number(e.target.value) as EnergyLevel)
          }
        />
      </div>

      <div>
        <label>Kommentar (valfri)</label>
        <textarea
          value={comment}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
          placeholder="Valfri kommentar…"
        />
      </div>

      {error && <div style={{ color: "crimson" }}>{error}</div>}

      <button type="submit">Skicka</button>
    </form>
  );
}
