import React from "react";
import { Botloading } from "../BotList/Botloading";

export const UserLoading: React.FC = () => {
    return (
        <main className="flex justify-center max-w-[1500px]">
            <section className="w-screen flex flex-row p-5 text-white items-start xl:items-center justify-center gap-10 xl:flex-col max-w-[1500px]">
                <div className="border-2 border-neutral-700 min-h-[300px] w-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex justify-start flex-col gap-4 relative">
                    <div className="w-full h-36 object-cover rounded-md rounded-b-none z-0 mb-14 bg-neutral-800 animate-pulse"></div>
                    <div className="w-full items-center flex justify-center z-1 absolute top-[50%] left-0 transform -translate-y-1/2">
                        <div className="rounded-full w-32 h-32 animate-pulse bg-neutral-800 border-2 border-neutral-900"></div>
                    </div>
                    <div className="flex flex-col justify-center gap-1 z-2 relative px-3 pb-4 mt-2">
                        <div className="animate-pulse bg-neutral-800 rounded-full w-1/2 h-6"></div>
                        <div className="animate-pulse bg-neutral-800 rounded-full w-10/12 h-6"></div>
                    </div>
                </div>
                <div className="flex items-start w-full flex-col gap-2">
                    <div className="w-80 animate-pulse h-8 rounded-lg bg-neutral-800"></div>
                    <div className="w-44 animate-pulse h-6 rounded-lg bg-neutral-800"></div>
                    <hr className="w-full my-3" />
                    <section className="w-full grid grid-cols-2 xl:place-items-center place-content-center gap-8 xl:grid-cols-1 ">
                        <Botloading fills={2} grid />
                    </section>
                </div>
            </section>
        </main>
    )
}