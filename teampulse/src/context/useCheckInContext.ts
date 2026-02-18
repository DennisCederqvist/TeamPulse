import { useContext } from "react";
import { CheckInContext, type CheckInContextType } from "./CheckInContext";

export function useCheckInContext(): CheckInContextType {
  const ctx = useContext(CheckInContext);
  if (!ctx) throw new Error("useCheckInContext måste användas inom CheckInProvider");
  return ctx;
}
