import React from "react";
import { UserLogin } from "../Login/Discordlogin";
import { InputSearch } from "../Search/InputSearch";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-center w-[100vw] max-w-[1500px]">
            <div className="w-[100%] border-b-[1px] border-[#8b8b8b] flex justify-center items-center bg-tansparent xl:flex-wrap">
                <Link to="/" className="flex w-[600px] xl:w-[100vw] xl:justify-center xl:items-center">
                    <h1 className="text-white flex flex-row text-[32px] mx-10 my-3"><strong>Simo</strong></h1>
                </Link>
                <InputSearch />
                <UserLogin />
            </div>
        </header>
    );
};
