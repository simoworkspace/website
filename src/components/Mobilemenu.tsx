import { Link } from "react-router-dom";
import searchIcon from "../assets/svg/search.svg";
import plusIcon from "../assets/svg/plus.svg";
import listIcon from ".././assets/svg/list.svg";
const avatarImage: string =
    "https://cdn.discordapp.com/avatars/955095844275781693/511a594d8af5dd14849cc3e16567f534.png?size=2048";

export const Mobilemenu = () => {
    return (
        <div className="hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full xl:bg-gray-900 xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center">
            <div className="flex flex-col items-center">
                <Link to="/">
                    <img
                        src={searchIcon}
                        alt="Ícone 1"
                        className="h-6 w-6 text-white"
                    />
                </Link>
                <span className="text-xs">Procurar bot</span>
            </div>
            <div className="flex flex-col items-center">
                <Link to="/addbot">
                    <img
                        src={plusIcon}
                        alt="Ícone 2"
                        className="h-6 w-6 text-white"
                    />
                </Link>
                <span className="text-xs">Adicionar bot</span>
            </div>
            <div className="flex flex-col items-center">
                <Link to="/">
                    <img
                        src={listIcon}
                        alt="Ícone 3"
                        className="h-6 w-6 text-white"
                    />
                </Link>
                <span className="text-xs">Servidores</span>
            </div>
            <div className="flex flex-col items-center">
                <Link to="/">
                    <img
                        className="h-6 w-6 text-white rounded-full"
                        src={avatarImage}
                        alt="User Avatar"
                    />
                </Link>
                <span className="text-xs">Perfil</span>
            </div>
        </div>
    );
};
