import onefill from "../assets/svg/numbers/one-fill.svg";
import React, { useState } from "react";

export const StepsForm: React.FC<{
    setStepsState: (value: number) => void;
    children: React.ReactNode;
}> = ({ setStepsState, children }) => {
    return (
        <div className="flex xl:justify-center xl:items-center xl:w-[90vw] xl:h-[100px] w-[30vw] h-[60vh]">
            <div className="flex gap-2 flex-col rounded-3xl h-[106%] w-[100%] justify-center items-center bg-neutral-900 shadow-md shadow-black text-white">
                <div className="flex text-xl mb-10 xl:mb-0">
                    <strong>Etapas</strong>
                </div>
                <div className="flex flex-col xl:h-[50px] items-center xl:flex-row">
                    <img
                        className="h-[40px] xl:mb-1"
                        src={onefill}
                        alt="Number one icon"
                    />
                    <hr className="h-[30px] m-5 xl:m-0 xl:mx-8 xl:rotate-90 w-[2px] bg-white" />
                    {children}
                </div>
            </div>
        </div>
    );
};
