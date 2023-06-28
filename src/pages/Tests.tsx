import React, { useReducer } from "react";

const initialState = {
    count: 0,
};

const reducer = (
    state: { count: number },
    action: { type: "remove" | "add" | "reset" }
) => {
    switch (action.type) {
        case "add":
            return { ...state, count: state.count + 1 };
        case "remove":
            if (state.count > 0) {
                return { ...state, count: state.count - 1 };
            }
        case "reset":
            return { ...state, count: (state.count = 0) };
    }
    return state;
};

export const Tests: React.FC = () => {
    const [contagem, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="text-white flex flex-col gap-2">
            <div>{contagem.count}</div>
            <div>
                <button
                    onClick={() => dispatch({ type: "add" })}
                    className="p-3 border-2 w-[100px]"
                >
                    adicionar
                </button>
                <button
                    onClick={() => dispatch({ type: "remove" })}
                    className="p-3 border-2 w-[100px]"
                >
                    remover
                </button>
                <button
                    onClick={() => dispatch({ type: "reset" })}
                    className="p-3 border-2 w-[100px]"
                >
                    resetar
                </button>
            </div>
        </div>
    );
};
