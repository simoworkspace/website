import React, { useState, ChangeEvent, FormEvent } from "react";
import searchIcon from "../assets/svg/search.svg";
import api from "../api";
import { AxiosResponse } from "axios";
import { DiscordUser } from "../types";

export const FormFindBot: React.FC<{
    setVerificarBot: (value: boolean) => void;
    setStepsState: (value: number) => void;
}> = ({ setVerificarBot, setStepsState }) => {
    const [statusCode, setStatusCode] = useState<number>();
    const [id, setId] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setId(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(id);
            res.data.bot ? setVerificarBot(true) : setVerificarBot(false);
            res.data.bot ? setStepsState(2) : setStepsState(1);
        } catch (error: any) {
            setStatusCode(error.response.status);
        }
    };

    return (
        <div className="text-white flex items-center justify-center w-[100vw] h-[60vh] xl:h-[100%]">
            <form
                className="flex-row xl:flex-col-reverse xl: flex items-center justify-center h-[90px]"
                onSubmit={handleSubmit}
            >
                <div className="flex items-center flex-col">
                    <div
                        className={`border-[#8b8b8b] items-center xl:w-[85vw] justify-center h-100px transition-all duration-300 rounded-xl border-2 bg-[#2c2c2c] ${
                            statusCode === 404
                                ? "border-[#ff0000]"
                                : "hover:border-neutral-300 focus-within:border-white"
                        }`}
                    >
                        <input
                            className="bg-transparent p-4 flex items-center justify-center outline-none w-full"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={`text-[#ff0000] text-[0px] ${
                            statusCode === 404 && "text-[16px]"
                        } transition-all duration-300`}
                    >
                        Digite um id válido!
                    </div>
                </div>
                <div className="flex m-2 flex-col">
                    <button
                        className={`flex rounded-xl xl:w-[85vw] flex-row items-center justify-center border-2 border-neutral-700 bg-neutral-900 hover:bg-neutral-700 transition-all duration-300 ${
                            statusCode == 404 && "mb-[24px] xl:mb-0"
                        } p-4`}
                        type="submit"
                    >
                        <img
                            className="mr-2"
                            src={searchIcon}
                            alt="Search Icon"
                        />
                        <span>Encontrar bot</span>
                    </button>
                </div>
            </form>
        </div>
    );
};
