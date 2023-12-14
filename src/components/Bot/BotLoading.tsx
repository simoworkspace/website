import { FC } from "react";
import * as icon from "react-icons/bs";

export const BotLoading: FC = () => {
    return (
        <div className="w-screen max-w-[1500px]">
            <div className="flex flex-col items-center justify-center">
                <section className="flex items-center xl:flex-col justify-center w-full xl:mt-2 mt-[30px] text-white">
                    <div className="bg-neutral-900 rounded-xl flex xl:flex-col xl:h-[320px] h-[120px] w-[95%] border-2 border-neutral-800 items-center justify-center">
                        <div className="w-[220px] h-[100px] xl:w-[100px] xl:my-2 ml-3 xl:ml-0 rounded-full bg-neutral-800 animate-pulse"></div>
                        <div className="flex flex-col w-full justify-center gap-2 xl:items-center">
                            <div className="ml-6 xl:m-0 xl:my-1 flex xl:flex-col xl:items-center flex-row gap-3">
                                <div className="rounded-full animate-pulse bg-neutral-800 w-56 h-10"></div>
                                <div className="rounded-full animate-pulse bg-neutral-800 w-40 h-6"></div>
                            </div>
                            <div className="rounded-full animate-pulse bg-neutral-800 w-32 h-6 ml-6 xl:ml-0"></div>
                        </div>
                        <div className="flex w-full justify-end ">
                            <div className="flex gap-4 items-center justify-center xl:w-screen flex-row m-4">
                                <div className="h-10 bg-neutral-800 animate-pulse hover:bg-neutral-800 transition-colors duration-300 p-2 rounded-md w-[120px] text-center">
                                </div>
                                <div className="bg-neutral-800 animate-pulse h-10 hover:bg-neutral-800 transition-colors duration-300 p-2 rounded-md w-[120px] text-center">
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-[90%] mb-5 bg-neutral-900 border-2 border-neutral-800 border-t-0 rounded-t-none rounded-lg p-10 xl:p-3">
                    <div className="flex flex-row xl:flex-col">
                        <div className="w-[80%] xl:w-full flex flex-col gap-3">
                            <div className="bg-neutral-800 rounded-full w-[30%] h-12"></div>
                            <div className="bg-neutral-800 rounded-full w-[93%] h-6"></div>
                            <div className="bg-neutral-800 rounded-full w-[86%] h-6"></div>
                            <div className="bg-neutral-800 rounded-full w-[36%] mb-3 h-6"></div>
                            <div className="bg-neutral-800 rounded-lg w-[38%] h-44"></div>
                            <div className="bg-neutral-800 rounded-full w-[93%] h-6"></div>
                            <div className="bg-neutral-800 rounded-full w-[93%] h-6"></div>
                            <div className="bg-neutral-800 rounded-full w-[43%] mb-3 h-6"></div>
                            <div className="bg-neutral-800 rounded-full w-[56%] h-12"></div>
                            <div className="bg-neutral-800 rounded-full w-[93%] h-6"></div>
                            <div className="bg-neutral-800 rounded-full w-[53%] h-6"></div>
                        </div>
                        <div className="w-[1px] bg-[#8b8b8b]" />
                        <hr className="xl:my-4 xl:w-full" />
                        <div className="flex flex-col gap-5 text-white px-5 w-[45%] xl:w-full">
                            <div className="w-full">
                                <div className="w-full">
                                    <h1 className="text-2xl text-center">Developer</h1>
                                    <hr className="my-4 w-full" />
                                    <div className="bg-neutral-900 w-56 border-neutral-800 border-2 p-2 rounded-lg justify-center flex flex-row items-center gap-4 transition-colors duration-300 h-[80px] animate-pulse">
                                        <div className="w-16 h-16 rounded-full bg-neutral-800 animate-pulse"></div>
                                        <div className="w-28 h-6 rounded-full bg-neutral-800 animate-pulse"></div>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl text-center mt-2">Informações</h1>
                                    <hr className="my-4 w-full" />
                                    <div className="flex flex-col w-full gap-3">
                                        <div className="flex gap-2 items-center">
                                            <strong className="text-lg">Prefixo</strong>
                                            <div className="bg-neutral-800 animate-pulse h-6 w-12 rounded-lg"></div>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <strong className="text-lg">Votos </strong>
                                            <div className="bg-neutral-800 animate-pulse h-6 w-7 rounded-lg"></div>
                                        </div>
                                        <div>
                                            <div className="flex flex-row gap-3 flex-wrap">
                                                <strong className="text-lg">Tags</strong>
                                                <div className="p-4 px-12 rounded-lg bg-neutral-800 border-2 border-neutral-700 animate-pulse"></div>
                                                <div className="p-4 px-16 rounded-lg bg-neutral-800 border-2 border-neutral-700 animate-pulse"></div>
                                                <div className="p-4 px-8 rounded-lg bg-neutral-800 border-2 border-neutral-700 animate-pulse"></div>
                                                <div className="p-4 px-10 rounded-lg bg-neutral-800 border-2 border-neutral-700 animate-pulse"></div>
                                            </div>
                                        </div>
                                        <h1 className="text-2xl text-center">Links</h1>
                                        <hr className="my-1 w-full" />
                                        <div className="flex flex-col gap-4">
                                            <div className="flex gap-2 items-center">
                                                <icon.BsDiscord size={30} fill="#5662F6" />
                                                <div className="flex items-center gap-3 p-2 w-[80%] h-[30px] bg-neutral-800 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <icon.BsGithub size={30} />
                                                <div className="flex items-center gap-3 p-2 w-[80%] h-[30px] bg-neutral-800 rounded-full"></div>
                                            </div>
                                            <div className="flex gap-2 items-center">
                                                <icon.BsGlobe size={30} />
                                                <div className="flex items-center gap-3 p-2 w-[80%] h-[30px] bg-neutral-800 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-screen max-w-[1500px] flex flex-col xl:ml-0 ml-[150px] mb-[30px] gap-5 xl:items-center xl:justify-center">
                    <div className="flex flex-col gap-2 w-[800px] xl:w-[90vw]">
                        <div className="bg-neutral-800 animate-pulse w-full h-[39px] rounded-full"></div>
                        <div className="bg-neutral-800 rounded-lg h-[112px] animate-pulse w-full mt-2"></div>
                        <div className="bg-neutral-800 animate-pulse w-[250px] h-[40px] rounded-full my-2"></div>
                        <div className="bg-neutral-800 animate-pulse w-full h-[52px] rounded-lg"></div>
                        <div className="bg-neutral-800 animate-pulse w-[300px] h-[39px] rounded-full my-2"></div>
                        <div className="flex flex-col gap-3">
                            {Array(3).fill(
                                <div className="bg-neutral-900 w-full h-[150px] rounded-lg border-2 border-neutral-800">
                                    <div className="flex flex-col p-3 gap-2">
                                        <div className="flex flex-row items-center justify w-full">
                                            <div className="w-[40px] h-[40px] rounded-full animate-pulse bg-neutral-800"></div>
                                            <div className="flex gap-2 items-center justify-center">
                                                <div className="p-1 ml-1 w-[120px] h-[25px] animate-pulse bg-neutral-800 rounded-full"></div>
                                                <div className="bg-neutral-800 rounded-full w-[100px] h-[20px] animate-pulse"></div>
                                            </div>
                                        </div>
                                        <div className="bg-neutral-800 w-[70%] h-[40px] rounded-full animate-pulse"></div>
                                        <div className="bg-neutral-800 animate-pulse w-[130px] h-[20px] rounded-lg"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};