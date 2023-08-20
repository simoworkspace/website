import React from "react";

export const FindBot: React.FC<{
    setSteps: (value: number) => void;
}> = ({ setSteps }) => {
    return (
        <button onClick={() => setSteps(1)}>asfjdkasl</button>
    )
};