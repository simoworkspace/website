import React from "react";
import { UserLogin } from "../Login/Discordlogin";
import { InputSearch } from "../Search/InputSearch";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
    return (
        <>
            <div className="xlr:sticky xlr:top-0 w-[100vw] max-w-[1500px] xlr:z-10 backdrop-blur-sm bg-transparent h-[74px]">
                <div className="w-[100%] flex justify-center items-center bg-transparent xl:flex-wrap">
                    <Link to="/" className="flex w-[300px] xl:w-[100vw] xl:justify-center xl:items-center">
                        <h1 className="text-white flex flex-row text-[32px] mx-10 my-3"><strong>Simo</strong></h1>
                    </Link>
                    <InputSearch />
                    <UserLogin />
                </div>
            </div>
            <hr className="w-[100vw] fixed mt-[74px] xl:invisible" />
        </>
    );
};
