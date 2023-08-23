import React, { useContext } from "react";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { BsCheckCircleFill } from "react-icons/bs";
import { FindBotStructure } from "../../types";
import { Link } from "react-router-dom";

export const FinishAddbot: React.FC<{ botData: FindBotStructure | undefined }> = ({ botData }) => {
    const { color } = useContext(ThemeContext);

    return (
        <section className="flex items-center justify-center h-[600px] w-[100vw] text-white">
            <div className={`bg-black rounded-lg ${borderColor[color]} border-2 w-[900px] h-[400px]`}>
                <div className="flex flex-col items-center justify-center h-[100%] w-[100%] gap-3">
                    <div className="flex items-start justify-center w-[100%]">
                        <BsCheckCircleFill fill="#2cd459" size={180} />
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-start w-[100%] text-center">
                        <h1 className="text-[26px]"><strong>Seu bot {botData ? botData.username : "..."} foi enviado para a análise!</strong></h1> 
                        <span>Após ele ser aprovado ou recusado, você vai ser mencionado no canal |📥・logs|, do servidor: <a href="https://discord.gg/DGDEJtRsms" className="underline text-blue-500 transition-colors hover:text-blue-400">discord.gg/DGDEJtRsms</a></span>
                        <span>Você pode ver uma preview do seu bot clicando nesse link: <Link to={`/bot/${botData?.id}`} className="underline text-blue-500 transition-colors hover:text-blue-400">/bot/{botData?.id}</Link></span>
                    </div>
                </div>
            </div>
        </section>
    )
};