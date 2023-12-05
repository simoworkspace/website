import { FC } from "react";
import { Button } from "../../components/Mixed/Button";

export const NotFound: FC = () => {
    return (
        <section className="w-screen xl:w-[90vw] p-8 max-w-[1500px] flex items-center justify-center text-white flex-col">
            <div className="flex flex-col xl:flex-col items-center xl:justify-center xl:text-center justify-start text-start break-before-all p-12 xl:p-10 rounded-lg gap-4">
                <span className="text-[40px] xl:text-[22px]"><strong>404 NOT_F0UND</strong></span>
                <div>
                    <img className="w-[300px] h-[200px] object-contain" src="https://cdn.discordapp.com/attachments/993955863150727289/1174504430012481637/Z.png?ex=657a4a7d&is=6567d57d&hm=c1e748a3f8b9babdb33fa0ca062f3da500b436ded54f9b02a81b923da0f9fe3d&" />
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-[20px] xl:text-[16px]">Página não encontrada.. mas você já comprou Simo Gomas hoje?</span>
                    <div className="w-full mt-2 flex justify-center items-center">
                        <div className="w-[200px] flex items-center">
                            <Button link clas="text-center">Take me back</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
