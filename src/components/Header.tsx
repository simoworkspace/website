import React from "react";
import { UserLogin } from "./Login/Discordlogin";
import { InputSearch } from "./Search/InputSearch";

export const Header: React.FC = () => {
    return (
        <div className="w-[100vw] relative border-b-[1px] border-[#8b8b8b] flex justify-center items-center bg-tansparent xp:flex-wrap">
            <div className="flex w-[600px] xl:w-[100vw] xl:justify-center">
                <h1 className="text-white flex flex-row text-[32px] mx-10 my-3"><strong>Simo</strong></h1>
            </div>
            <InputSearch />
            <UserLogin />
        </div>
    );
};
