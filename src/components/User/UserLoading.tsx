import React from "react";

export const UserLoading: React.FC = () => {
    return (
        <section className="w-screen flex flex-row p-5 text-white items-center justify-center gap-10 xl:flex-col max-w-[1500px]">
            <div className="border-2 w-[300px] h-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col">
                <div>
                    <div className="rounded-full w-[100px] h-[100px] bg-neutral-800 animate-pulse" />
                </div>
                <hr className="w-[80%] my-5" />
                <div className="flex flex-col text-center justify-center">
                    <div className="bg-neutral-800 rounded-lg w-[120px] h-[20px] animate-pulse"></div>
                    <div className="text-[#797979] items-center flex text-[13px] justify-center"></div>
                </div>
            </div>
            <div className="flex items-center justify-center w-full flex-col max-w-[1500px]">
                <div className="bg-neutral-800 rounded-lg w-[600px] xl:w-[90vw] h-[20px] animate-pulse"></div>
                <hr className="w-full my-3" />
                <section className="w-full grid grid-cols-2 xl:place-items-center place-content-center gap-8 xl:grid-cols-1 ">
                    {Array(2).fill(
                        <div className="border-2 bg-card-blue rounded-[10px] bg-neutral-950 xl:w-[95vw]">
                            <div className="bg-neutral-900 xl:w-[80px] xl:h-[80px] w-[100px] h-[100px] float-right rounded-full mt-[10px] mr-[10px] self-center animate-pulse"></div>
                            <div className="bg-neutral-900 xl:w-[50%] w-[220px] h-[26px] rounded-[10px] flex ml-20 xl:ml-10 animate-pulse"></div>
                            <div className="bg-neutral-900 xl:w-[65%] w-[70%] h-[72px] mt-3 rounded-[10px] ml-3 animate-pulse"></div>
                            <div className="m-[10px] flex ">
                                <div className="bg-neutral-900 w-[170px] h-[40px] m-2 rounded-[20px] animate-pulse"></div>
                                <div className="bg-neutral-900 w-[170px] h-[40px] m-2 rounded-[20px] animate-pulse"></div>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </section>
    )
}