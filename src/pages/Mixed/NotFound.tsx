import React, { useContext, useEffect, useState } from "react";
import { buttonColor } from '../../utils/theme/button';
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import  axios, { AxiosResponse } from "axios";

export const NotFound: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const [cat, setCat] = useState<string>();

    const generateCat = async (): Promise<void> => {
        const req: AxiosResponse<[{ url: string }]> = await axios.get("https://api.thecatapi.com/v1/images/search");
        setCat(req.data[0].url);
    };

    useEffect(() => {
        generateCat();
    }, []);

    return (
        <section className="w-screen xl:w-[90vw] h-[600px] max-w-[1500px] flex items-center justify-center text-white flex-col">
            <div className={`border-2 ${borderColor[color]} flex flex-col items-center justify-center text-center break-before-all p-[50px] xl:p-10 rounded-lg bg-neutral-900 gap-4`}>
                <span className="text-[40px] xl:text-[22px]"><strong>Página não encontrada.</strong></span>
                <span className="text-[22px] xl:text-[16px]">Nossos anões digitais procuraram por todos os cantos, mas não conseguiram encontrar a página que você está buscando.</span>
                {cat ? (
                    <img  className="w-[300px] h-[200px] object-contain" src={cat} />
                ) : (
                    <div className="bg-neutral-800 animate-pulse w-[300px] h-[200px]"></div>
                )}
                <button onClick={() => location.href = "/"} className={`${buttonColor[color]} transition-colors duration-300 p-3 rounded-lg border-2`}>Take me back</button>
            </div>
        </section>
    );
};
