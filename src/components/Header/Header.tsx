import React, { useState } from "react";
import { UserLogin } from "../Login/Discordlogin";
import { Button } from "../Mixed/Button";
import * as icon from "react-icons/bs";
import { InputSearch } from "../Search/InputSearch";
import { Link } from "react-router-dom";
import { NotificationButton } from "../Notification/Button";

export const Header: React.FC = () => {
  const [inputSearch, setInputSearch] = useState<boolean>(false);
  
    return (
        <>
            <div className="sticky xl:fixed top-0 w-screen max-w-[1500px] z-10 backdrop-blur-sm bg-transparent h-[74px] xl:h-[60px] xl:border-b-2">
                <div className="w-full flex justify-center items-center bg-transparent xl:flex-wrap xl:h-[60px]">
                    <div className="flex xl:w-screen xl:justify-center xl:items-center">
                        <Link to="/" className="text-white flex flex-grow flex-row text-[32px] mx-10 my-3 xl:mx-0 xl:my-1 xl:justify-center xl:w-full xl:h-full xl:items-center xl:ml-6"><strong>Simo</strong></Link>
                    <Button action={() => setInputSearch(!inputSearch)} clas="xlr:invisible hover:bg-transparent"><icon.BsSearch fill="#fff"/></Button>
                    </div>
                    <InputSearch show={inputSearch} />
                    <NotificationButton/>
                    <UserLogin />
                </div>
            </div>
            <hr className="w-screen xlr:fixed mt-[74px] xl:opacity-0" />
        </>
    );
};
