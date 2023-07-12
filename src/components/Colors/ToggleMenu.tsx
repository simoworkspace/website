import paletteIcon from "../../assets/svgs/pallete.svg";

export const ToggleColorMenu: React.FC<{
    setMenu: (value: boolean) => void;
    menu: boolean;
}> = ({ setMenu, menu }) => {
    return (
        <button onClick={() => setMenu(!menu)} onBlur={() => setMenu(false)}
            className={`w-[40px] bg-black ${
                !menu
                    ? "border-white"
                    : "border-[#fff] hover:border-[#a8a8a8]"
                } justify-center border-[1px] transition-all duration-200 h-[50px] flex items-center xl:hidden`}
        >
            <img className="w-[60%] flex" src={paletteIcon} alt="Palette icon" />
        </button>
    )
}