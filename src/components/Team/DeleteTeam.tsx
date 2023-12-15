import { FC, useState, useContext } from "react";
import { Team } from "../../types";
import { PopUp } from "../Mixed/PopUp";
import { borderAndBg } from "../../utils/theme/border&bg";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";
import * as icon from "react-icons/bs";

export const DeleteTeam: FC<{
    setDeletedTeam: (value: boolean) => void;
    deletedTeam: boolean
    team: Team;
}> = ({ setDeletedTeam, team, deletedTeam }) => {
    const [submit, setSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [teamName, setTeamName] = useState<string>("");

    const { color } = useContext(ThemeContext);

    const deleteTeam = async (): Promise<void> => {
        setLoading(true);

        await api.deleteTeam(team.id as string);

        setLoading(false);
        setDeletedTeam(false);

        window.location.href = "/dashboard";
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSubmit(false);

        const newTeamName = event.target.value;
        setTeamName(newTeamName);

        if (newTeamName === team.name) {
            setSubmit(true);
        }
    };

    return (
        <PopUp setMenu={setDeletedTeam} menu={deletedTeam} >
            <div className="bg-neutral-700 w-full h-[30px] rounded-t-lg items-center justify-end flex flex-row-reverse">
                <button onClick={() => setDeletedTeam(false)} className="mr-1">
                    <icon.BsX size={30} className="transition-colors duration-300 hover:fill-red-500" />
                </button>
                <span className="flex-grow flex text-center ml-[30px] gap-1">Deletar<strong>{team.name}</strong></span>
            </div>
            <div className="flex h-full flex-col items-center w-full justify-center p-3 gap-4">
                <div className="flex flex-row justify-center gap-2 mt-2">
                    <img onError={async ({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = (await import("../../assets/images/simo.png")).default;
                    }} className="w-16 h-16 rounded-full" src={team.avatar_url} />
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-bold text-lg">{team.name}</span>
                    </div>
                </div>
                <span className="my-2">Se deseja mesmo deletar seu time <strong>{team.name}</strong>, digite o nome dele abaixo.</span>
                <div className="flex flex-col gap-1 items-center justify-center w-full">
                    <input placeholder="Digite aqui" required value={teamName} onChange={handleInputChange} className={`bg-transparent p-2 rounded-lg focus:outline-none border-2 w-full ${borderAndBg[color]}`} type="text" />
                    <button onClick={deleteTeam} disabled={!submit || loading} className={`${buttonColor["red"]} border-2 p-2 duration-300 trasition-all w-full flex items-center justify-center rounded-lg disabled:opacity-50 gap-1`}>
                        {loading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={24} className="animate-spin" /> : <><icon.BsTrashFill /><span>Deletar</span></>}
                    </button>
                </div>
            </div>
        </PopUp>
    )
}