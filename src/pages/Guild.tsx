import React from 'react';
import { useParams } from 'react-router-dom';

export const Guild: React.FC = () => {
    const params = useParams<string>();
    return(
        <div>id: {params.guildid}</div>
    )
};