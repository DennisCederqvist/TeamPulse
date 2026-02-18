import { useMemo } from "react";
import type { CheckIn, DayStats, Mood } from "../types";

export function useDayStats(checkIns: CheckIn[]): DayStats {
  return useMemo(() => {
    const totalCheckIns = checkIns.length;

    const moodDistribution = checkIns.reduce<Record<Mood, number>>(
      (acc, c) => {
        acc[c.mood] = (acc[c.mood] ?? 0) + 1;
        return acc;
      },
      {} as Record<Mood, number>,
    );

    const averageEnergy =
      totalCheckIns === 0
        ? 0
        : checkIns.reduce((sum, c) => sum + c.energy, 0) / totalCheckIns;

    return { totalCheckIns, averageEnergy, moodDistribution };
  }, [checkIns]);
}
