import React, { createContext, useEffect, useState, useReducer } from "react";
import { UserStructure } from "../types";

const [userData, setUserData] = useState<UserStructure>();

useEffect(() => {}, [])

export const SignedUser = createContext(userData);

export const SignedUserProvider: React.FC = ({ children }: React.PropsWithChildren) => {
    return (
        <SignedUser.Provider value={userData}>
            {children}
        </SignedUser.Provider>
    );
};
