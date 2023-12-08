import React, { useState } from "react";
import { Button } from "../Mixed/Button";
import * as icon from "react-icons/bs";
import { InputSearch } from "../Search/InputSearch";
import { Link } from "react-router-dom";
import { NotificationButton } from "../Notification/Button";
import { LoginMenu } from "../DropdownMenu/Menu";

export const Header: React.FC = () => {
    const [inputSearch, setInputSearch] = useState<boolean>(false);

    return (
        <>
            <div className="sticky xl:fixed top-0 w-screen max-w-[1500px] z-10 backdrop-blur-sm bg-transparent h-[74px] xl:h-[60px] xl:border-b-2">
                <div className="w-full flex justify-center items-center bg-transparent xl:flex-wrap xl:h-[60px]">
                    <div className="flex xl:relative xl:w-screen xl:justify-center xl:items-center">
                        <a href="https://www.youtube.com/watch?v=mMo8DvW9DP8"><div className="absolute left-[94px] xl:left-0 xl:hidden top-2 rotate-[12deg]"><img className="w-11" src="https://www.imagensempng.com.br/wp-content/uploads/2020/11/0012-1.png" /></div></a>
                        <Link to="/" className="text-white flex flex-grow flex-row text-[32px] mx-10 my-3 xl:mx-0 xl:my-1 xl:justify-center xl:w-full xl:h-full xl:items-center xl:ml-6"><strong>Simo</strong></Link>
                        <Button action={() => setInputSearch(!inputSearch)} clas="xlr:invisible hover:bg-transparent"><icon.BsSearch fill="#fff" /></Button>
                    </div>
                    <InputSearch show={inputSearch} />
                    <NotificationButton />
                    <LoginMenu />
                </div>
            </div>
            <hr className="w-screen xlr:fixed mt-[74px] xl:opacity-0 border-neutral-500" />
        </>
    );
};
