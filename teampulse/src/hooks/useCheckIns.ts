import { useReducer } from "react";
import type { CheckIn } from "../types";
import { checkInReducer } from "../reducers/checkInReducer";

export function useCheckIns (initial: CheckIn[] = []) {
    const [checkIns, setCheckIns] = useReducer(checkInReducer, initial);

    const addCheckIn = (payload: Omit<CheckIn, "id" | "timestamp">) => setCheckIns({type: "ADD_CHECKIN", payload});

    const removeCheckIn = (id: string) => 
        setCheckIns({type: "REMOVE_CHECKIN", payload: {id}});

    const clearDay = (date: string) => setCheckIns({type: "CLEAR_DAY", payload: {date}});

    return {checkIns, addCheckIn, removeCheckIn, clearDay};

}