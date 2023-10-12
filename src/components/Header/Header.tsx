import React from "react";
import { UserLogin } from "../Login/Discordlogin";
import { InputSearch } from "../Search/InputSearch";
import { Link } from "react-router-dom";
import { NotificationButton } from "../Notification/Button";

export const Header: React.FC = () => {
    return (
        <>
            <div className="xlr:sticky xlr:top-0 w-[100vw] max-w-[1500px] xlr:z-10 backdrop-blur-sm bg-transparent h-[74px]">
                <div className="w-[100%] flex justify-center items-center bg-transparent xl:flex-wrap">
                    <div className="flex xl:w-[100vw] xl:justify-center xl:items-center">
                        <Link to="/" className="text-white flex flex-grow flex-row text-[32px] mx-10 my-3"><strong>Simo</strong></Link>
                    </div>
                    <InputSearch />
                    <NotificationButton/>
                    <UserLogin />
                </div>
            </div>
            <hr className="w-[100vw] fixed mt-[74px] xl:invisible" />
        </>
    );
};
