import React from "react";
import { UserLogin } from "./Login/Discordlogin";
import { InputSearch } from "./Search/InputSearch";
import { ColorButton } from "./Colors/ColorButton";

export const Header: React.FC = () => {
    return (
        <div className="w-[100%] border-b-[1px] border-[#8b8b8b] flex justify-center items-center bg-tansparent to-[100%] xp:flex-wrap">
            <div className="flex w-[600px] xl:w-[100vw] xl:justify-center">
                <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                    <strong className="text-[#ffffff]">Bot</strong>
                    <div className="text-[#a8a8a8]">List</div>
                </h1>
            </div>
            <InputSearch />
            <ColorButton />
            <UserLogin />
        </div>
    );
};
