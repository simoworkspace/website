import React from "react";
import { useParams } from "react-router-dom";

export const Vote: React.FC = () => {
    const params = useParams<string>();
    return (
        <div>id do bot: {params.botid}</div>
    );
};