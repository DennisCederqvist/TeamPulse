import type { CheckIn } from "../types"

type CheckInAction =
| { type: "ADD_CHECKIN"; payload: Omit<CheckIn, "id" | "timestamp"> }
| { type: "REMOVE_CHECKIN"; payload: { id: string } }
| { type: "CLEAR_DAY"; payload: { date: string } };

export function checkInReducer(state: CheckIn[], action: CheckInAction): CheckIn[] {
    switch (action.type) {
        case "ADD_CHECKIN": {
            const newItem: CheckIn = {
                ...action.payload,
                id: crypto.randomUUID(),
                timestamp: new Date(),
            };
            return [newItem, ...state]
        }
        case "REMOVE_CHECKIN":
            return state.filter((x) => x.id !== action.payload.id);

        case "CLEAR_DAY": {
            const target = action.payload.date;
            return state.filter((x) => toDateKey(x.timestamp) !== target);
        }

        default:
            return state;
    }

    function toDateKey(date: Date) {
        const dt = new Date(date);
        const y = dt.getFullYear();
        const m = String(dt.getMonth() + 1).padStart(2, "0");
        const day = String(dt.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
    }
}