import { FC, useContext, useState } from "react";
import simo from "../../assets/images/simo.png";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FaDiscord } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Login: FC = () => {
    const { color } = useContext(ThemeContext);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <main className="w-screen max-w-[800px] h-full justify-center items-center flex p-6">
            <section className={`flex bg-neutral-900 rounded-lg w-full p-6 text-white border-2 ${borderColor[color]}`}>
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold xl:flex-grow">Fazer login na Simo</h1>
                    <span className="break-words">Ao fazer login no Simo, você tem acesso a uma variedade de recursos e funcionalidades adicionais. Agora, você pode realizar diversas ações, como adicionar um bot, criar um time, personalizar seu perfil, votar em um bot, fornecer feedback sobre um bot e muito mais! Só clicar no botão abaixo 😉</span>
                    <div className="flex xl:w-full">
                        <button onClick={() => {
                            setLoading(true);
                            window.location.href = import.meta.env.VITE_AUTH_LINK;
                        }} disabled={loading} className="flex gap-3 disabled items-center justify-center bg-[#535FEE] rounded-lg p-3 w-60 shadow-sm hover:shadow-md focus:translate-y-2 shadow-neutral-600">
                            {loading ? (
                                <AiOutlineLoading3Quarters fill="#fff" size={28} className="animate-spin" />
                            ) : (
                                <>
                                    <FaDiscord />
                                    <span>Fazer login com Discord</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </section>
        </main>
    )
};