import { createContext } from "react";
import type { CheckIn, DayStats } from "../types";

export type CheckInContextType = {
  checkIns: CheckIn[];
  todayCheckIns: CheckIn[];
  stats: DayStats;
  addCheckIn: (payload: Omit<CheckIn, "id" | "timestamp">) => void;
  removeCheckIn: (id: string) => void;
  clearDay: (date: string) => void;
};

export const CheckInContext = createContext<CheckInContextType | null>(null);
