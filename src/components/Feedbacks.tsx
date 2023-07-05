import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const Feedbacks: React.FC  = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <img 
                src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png?size=2048`} 
                alt={`${user?.username}'s avatar`} 
                className="w-[100px] h-[100px]"    
            />
            <h1>{user?.username}</h1>
        </div>
    )
};