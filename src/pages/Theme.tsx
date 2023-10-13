import { FC, useContext } from "react";
import { ChoiceColor } from "../components/Colors/Choice";
import { borderColor } from "../utils/theme/border";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemesPage: FC = () => {
    const selectedTheme = localStorage.getItem("theme") || "purple";
    const { color } = useContext(ThemeContext);

    return (
        <section className="flex w-[90vw] h-[68vh] flex-col gap-3 p-3 text-white justify-center">
            <h1 className="text-center text-[28px]"><strong>Seletor de temas</strong></h1>
            <div className={`rounded-lg border-2 ${borderColor[color]} p-3 flex justify-center bg-black flex-col text-white`}>
                <ChoiceColor name="Vermelho" theme="red" margin="6px" selected={selectedTheme === "red"} />
                <ChoiceColor name="Azul" theme="blue" margin="6px" selected={selectedTheme === "blue"} />
                <ChoiceColor name="Roxo" theme="purple" margin="6px" selected={selectedTheme === "purple"} />
                <ChoiceColor name="Verde" theme="green" margin="6px" selected={selectedTheme === "green"} />
                <ChoiceColor name="Preto" theme="black" margin="6px" selected={selectedTheme === "black"} />
            </div>
        </section>
    )
};