import React from "react";
import UserLogin from "./Discordlogin";
import { InputSearch } from "./InputSearch";

export const Header: React.FC = () => {
    return (
        <div className="w-[100%] border-b-[1px] border-[#8b8b8b] flex justify-center items-center bg-gradient-to-r from-[#131720] from-[40%] to-[#0c0c0c] to-[100%] xp:flex-wrap">
            <div className="flex w-[600px] xl:w-[100vw] xl:justify-center">
                <h1 className="text-white text-[32px] mx-10 my-3">
                    <strong className="text-roxo-legal">Bot</strong>List
                </h1>
            </div>
            <InputSearch />
            <UserLogin />
        </div>
    );
};
