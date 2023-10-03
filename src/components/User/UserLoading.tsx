import React from "react";
import { Botloading } from "../BotList/Botloading";

export const UserLoading: React.FC = () => {
    return (
        <section className="w-[100vw] flex flex-row p-5 text-white items-center justify-center gap-10 xl:flex-col">
            <div className="border-2 w-[300px] h-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col">
                <div>
                    <div className="rounded-full w-[100px] h-[100px] bg-neutral-800" />
                </div>
                <hr className="w-[80%] my-5" />
                <div className="flex flex-col text-center justify-center">
                    <div className="bg-neutral-800 rounded-lg w-[120px] h-[20px]"></div>
                    <div className="text-[#797979] items-center flex text-[13px] justify-center"></div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full flex-col">
                <div className="bg-neutral-800 rounded-lg w-[600px] h-[20px]"></div>
                <hr className="w-full my-3" />
                <section className="w-full">
                    <Botloading fills={2}/>
                </section>
            </div>
        </section>
    )
}