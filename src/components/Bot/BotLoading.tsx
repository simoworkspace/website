import React from "react";

export const BotLoading: React.FC = () => {
    return (
        <div className="w-[100vw] max-w-[1500px]">
            <div className="flex flex-col items-center justify-center">
                <section className="flex items-center xl:flex-col justify-center w-[100%] xl:mt-2 mt-[30px] text-white">
                    <div className="bg-neutral-900 rounded-xl flex xl:flex-col xl:h-[320px] h-[120px] w-[95%] border-2 items-center justify-center">
                        <div className="w-[220px] h-[100px] xl:my-2 rounded-full xl:float-none ml-2 bg-neutral-800 animate-pulse"></div>
                        <div className="flex flex-col w-[100%] justify-center gap-2">
                            <div className="ml-6 xl:m-0 xl:my-1 text-white flex xl:flex-col xl:items-center flex-row gap-3 text-[26px] w-[400px] h-[60px] rounded-lg bg-neutral-800 animate-pulse">
                                <span className="text-[#797979] items-center flex text-[13px]"></span>
                            </div>
                        </div>
                        <div className="flex w-[100%] justify-end ">
                            <div className="flex gap-4 items-center justify-center xl:w-[100vw] flex-row m-4">
                                <a className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center">
                                    <span>Votar</span>
                                </a>
                                <a className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center">
                                    <span>Adicionar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-[90%] mb-5 bg-neutral-900 border-2 border-t-0 rounded-t-none rounded-lg p-10 xl:p-3">
                    <div className="flex flex-row xl:flex-col">
                        <div className="w-[80%] xl:w-[100%] flex break-words xl:justify-center">
                            <div className="w-[93%] bg-neutral-800 rounded-lg animate-pulse"></div>
                        </div>
                        <div className="w-[1px] bg-[#8b8b8b]" />
                        <hr className="xl:my-4 xl:w-[100%]" />
                        <div className="flex flex-col gap-5 text-white px-5 w-[45%] xl:w-[100%]">
                            <div className="w-[100%]">
                                <div className="w-[100%]">
                                    <h1 className="text-2xl text-center">Developer</h1>
                                    <hr className="my-4 w-[100%]" />
                                    <div>
                                        <a className="bg-neutral-800 p-2 rounded-lg flex flex-row xl:flex-col items-center gap-4 transition-colors duration-300 hover:bg-neutral-800 w-[100%] h-[80px] animate-pulse"></a>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-2xl text-center mt-2">Informações</h1>
                                    <hr className="my-4 w-[100%]" />
                                    <div className="flex flex-col w-[100%] gap-3">
                                        <div>
                                            <strong className="text-lg">Prefixo</strong> <span>...</span>
                                        </div>
                                        <div>
                                            <strong className="text-lg">Votos </strong><span>...</span>
                                        </div>
                                        <div>
                                            <div className="flex flex-row gap-3 flex-wrap">
                                                <strong className="text-lg">Tags</strong>
                                                <div className="p-[6px] rounded-lg bg-neutral-800 w-[80%] h-[65px] animate-pulse"></div>
                                            </div>
                                        </div>
                                        <h1 className="text-2xl text-center">Links</h1>
                                        <hr className="my-1 w-[100%]" />
                                        <div className="flex flex-col gap-3 flex-wrap">
                                            <a className="flex items-center gap-3 p-2 w-[80%] h-[30px] bg-neutral-800 rounded-full"></a>
                                            <a className="flex items-center gap-3 p-2 w-[80%] h-[30px] bg-neutral-800 rounded-full"></a>
                                            <a className="flex items-center gap-3 p-2 w-[80%] h-[30px] bg-neutral-800 rounded-full"></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-[100vw] max-w-[1500px] flex flex-col xl:ml-0 ml-[150px] mb-[30px] gap-5 xl:items-center xl:justify-center">
                    <div className="flex flex-col gap-2 w-[800px] xl:w-[90vw]">
                        <div className="bg-neutral-800 animate-pulse w-full h-[39px] rounded-full"></div>
                        <div className="bg-neutral-800 rounded-lg h-[112px] animate-pulse w-full mt-2"></div>
                        <div className="bg-neutral-800 animate-pulse w-[250px] h-[40px] rounded-full my-2"></div>
                        <div className="bg-neutral-800 animate-pulse w-full h-[52px] rounded-lg"></div>
                        <div className="bg-neutral-800 animate-pulse w-[300px] h-[39px] rounded-full my-2"></div>
                        <div className="flex flex-col gap-3">
                            {Array(3).fill(
                                <div className="bg-neutral-900 w-[100%] h-[150px] rounded-lg border-2">
                                    <div className="flex flex-col p-3 gap-2">
                                        <div className="flex flex-row items-center justify w-[100%]">
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