import React from "react";
import * as icon from 'react-icons/bs';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t-[1px] border-[#8b8b8b] w-[100%] h-[90px] text-white flex items-center">
            <div className="text-white flex flex-row items-center justify-center text-[32px] mx-10 my-3">
                <strong>Simo</strong>
                <div className="bg-white w-[30px] h-[1px] mx-[20px]"></div>
                <span className="text-[18px] text-[#c5c5c5]">Uma botlist muito daora e bonita</span>
            </div>
            <section className="flex flex-row items-center justify-end flex-grow mx-10 my-3">
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 gap-[25px] text-[#b9b9b9]">
                        <a href="https://github.com/Simo-Workspace" target="_blank"><icon.BsGithub className="hover:-translate-y-[6px] hover:fill-white cursor-pointer transition-all duration-300" size={35} /></a>
                        <a href="https://discord.gg/DGDEJtRsms" target="_blank"><icon.BsDiscord className="hover:-translate-y-[6px] hover:fill-[#5165F5] cursor-pointer transition-all duration-300" size={35} /></a>
                    </div>
                </div>
            </section>
        </footer>
    )
};