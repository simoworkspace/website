import React, { createContext, useEffect, useState, useReducer } from "react";
import { UserStructure } from "../types";
import axios from "axios";

// const [userData, setUserData] = useState<UserStructure>();

const userData = {
    id: "oie",
    avatar: "oie",
    name: "oie"
}
useEffect(() => {}, [])

export const SignedUser = createContext(userData);

export const SignedUserProvider: React.FC = ({ children }: React.PropsWithChildren) => {
    return (
        <SignedUser.Provider value={userData}>
            {children}
        </SignedUser.Provider>
    );
};
