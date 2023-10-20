import React from "react";
import { UserLogin } from "../Login/Discordlogin";
import { InputSearch } from "../Search/InputSearch";
import { Link } from "react-router-dom";
import { NotificationButton } from "../Notification/Button";

export const Header: React.FC = () => {
    return (
        <>
            <div className="sticky top-0 w-screen max-w-[1500px] xlr:z-10 backdrop-blur-sm bg-transparent h-[74px] xl:h-[60px]">
                <div className="w-full flex justify-center items-center bg-transparent xl:flex-wrap xl:h-[60px]">
                    <div className="flex xl:w-screen xl:justify-center xl:items-center">
                        <Link to="/" className="text-white flex flex-grow flex-row text-[32px] mx-10 my-3 xl:mx-0 xl:my-1 xl:justify-center xl:w-full xl:h-full xl:items-center"><strong>Simo</strong></Link>
                    </div>
                    <InputSearch />
                    <NotificationButton/>
                    <UserLogin />
                </div>
            </div>
            <hr className="w-screen fixed mt-[74px] xl:mt-[60px]" />
        </>
    );
};
