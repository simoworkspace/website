import { reducerActionType } from "../types";

export interface ThemeType {
    status: "blue" | "red" | "green";
};

export const themeInitialState: ThemeType = {
    status: localStorage.getItem("theme") as any
}

export const themeReducer = (state: ThemeType, action: reducerActionType) => {
    switch (action.type) {
        case "CHANGE_COLOR":
            localStorage.setItem("theme", action.payload.status); 
            return {...state, status: action.payload.status};
    };

    return state;
};