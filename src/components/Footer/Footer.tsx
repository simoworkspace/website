import React from "react";
import * as icon from 'react-icons/bs';

export const Footer: React.FC = () => {
    return (
        <>
            <hr className="w-screen border-neutral-500" />
            <footer className="flex items-center justify-center w-screen max-w-[1500px]">
                <div className="w-full h-[90px] xl:h-[150px] text-white flex xl:flex-col items-center xl:mb-[70px] justify-center">
                    <div className="text-white flex flex-row xl:flex-col items-center text-center justify-center text-[32px] mx-10 my-3 xl:mx-0">
                        <strong>Simo</strong>
                        <div className="bg-white w-[30px] h-[1px] mx-[20px] xl:invisible"></div>
                        <span className="text-[18px] text-[#c5c5c5]">Uma botlist muito daora e bonita</span>
                    </div>
                    <section className="flex flex-row items-center justify-end flex-grow xl:flex-grow-0 mx-10 my-3">
                        <div className="flex flex-col">
                            <div className="grid grid-cols-2 gap-[25px] text-[#b9b9b9]">
                                <a href="https://github.com/simoworkspace" target="_blank"><icon.BsGithub className="hover:-translate-y-[6px] hover:fill-white cursor-pointer transition-all duration-300" size={35} /></a>
                                <a href="https://discord.gg/DGDEJtRsms" target="_blank"><icon.BsDiscord className="hover:-translate-y-[6px] hover:fill-[#5165F5] cursor-pointer transition-all duration-300" size={35} /></a>
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        </>
    )
};
