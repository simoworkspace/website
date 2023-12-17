import { FC, useState } from "react";
import { Team } from "../../types";
import { PopUp } from "../Mixed/PopUp";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import api from "../../utils/api";
import { BsX } from "react-icons/bs";
import { buttonColor } from "../../utils/theme/button";
import { BiArrowBack } from "react-icons/bi";
import { Button } from "../Mixed/Button";

export const LeaveTeam: FC<{ team: Team | undefined, menu: boolean, setMenu: (value: boolean) => void }> = ({ team, menu, setMenu }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const leaveTeam = async () => {
        setLoading(true);

        if (team?.id) await api.leaveTeam(team.id);

        window.location.href = `/dashboard`;
        setLoading(false);
    }

    return team ? (
        <PopUp menu={menu} setMenu={setMenu}>
            <div className="bg-neutral-700 w-full h-[30px] rounded-t-lg items-center justify-end flex flex-row-reverse">
                <button onClick={() => setMenu(false)} className="mr-1">
                    <BsX size={30} className="transition-colors duration-300 hover:fill-red-500" />
                </button>
                <span className="flex-grow flex text-center ml-[30px] gap-1">Sair do time<strong>{team.name}</strong></span>
            </div>
            <div className="flex h-full flex-col items-center w-full justify-center p-3 gap-4">
                <div className="flex flex-row justify-center gap-2 mt-2">
                    <img onError={async ({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = (await import("../../assets/images/simo.png")).default;
                    }} className="w-16 h-16 rounded-full" src={team.avatar_url} />
                    <div className="flex flex-col justify-center items-start">
                        <span className="font-bold text-lg">{team.name}</span>
                        <span>Membros: {team.members?.length}</span>
                    </div>
                </div>
                <span className="my-2">Você deseja mesmo sair do time <strong>{team.name}</strong>?</span>
                <div className="flex gap-1 xl:flex-col items-center justify-center w-full">
                    <Button action={() => setMenu(false)} clas="w-1/3 xl:w-full">
                        <span>Voltar</span>
                    </Button>
                    <button onClick={leaveTeam} disabled={loading} className={`${buttonColor["red"]} h-[52px] border-2 p-2 duration-300 trasition-all w-full flex items-center justify-center rounded-lg disabled:opacity-50 gap-1`}>
                        {loading ? <AiOutlineLoading3Quarters fill="#fff" size={24} className="animate-spin" /> : <><BiArrowBack /><span>Sair</span></>}
                    </button>
                </div>
            </div>
        </PopUp>
    ) : (
        <div>Carregando...</div>
    )
}