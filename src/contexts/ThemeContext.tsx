import React, { createContext, useReducer } from "react";
import { reducerActionType } from "../types";
import { ThemeType, themeReducer, themeInitialState } from "../reducers/ThemeReducer";

interface initialStateStructure {
    theme: ThemeType;
};

interface ContextStructure {
    state: initialStateStructure;
    dispatch: React.Dispatch<any>;
};

const initialState = {
    theme: themeInitialState
};

export const ThemeContext = createContext<ContextStructure>({
    state: initialState,
    dispatch: () => null
});

const mainReducer = (state: initialStateStructure, action: reducerActionType) => ({
    theme: themeReducer(state.theme, action)
});

export const ThemeProvider: React.FC<{ children: any }> = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>;
};