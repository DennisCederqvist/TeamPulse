import { useMemo, type ReactNode } from "react";
import { useCheckIns } from "../hooks/useCheckIns";
import { useDayStats } from "../hooks/useDayStats";
import { CheckInContext, type CheckInContextType } from "./CheckInContext";

function toDateKey(d: Date) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function CheckInProvider({ children }: { children: ReactNode }) {
  const { checkIns, addCheckIn, removeCheckIn, clearDay } = useCheckIns([]);

  const todayKey = toDateKey(new Date());

  const todayCheckIns = useMemo(() => {
    return checkIns.filter((c) => toDateKey(c.timestamp) === todayKey);
  }, [checkIns, todayKey]);

  const stats = useDayStats(todayCheckIns);

  const value: CheckInContextType = useMemo(
    () => ({
      checkIns,
      todayCheckIns,
      stats,
      addCheckIn,
      removeCheckIn,
      clearDay,
    }),
    [checkIns, todayCheckIns, stats, addCheckIn, removeCheckIn, clearDay]
  );

  return <CheckInContext.Provider value={value}>{children}</CheckInContext.Provider>;
}
