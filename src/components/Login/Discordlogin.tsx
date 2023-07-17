import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { LoginButton } from "./Login";
import { LoggedMenu } from "./Menu";

export const UserLogin: React.FC = () => {
    const { user } = useContext(UserContext);
    
    return user ? <LoggedMenu/> : <LoginButton/>
};