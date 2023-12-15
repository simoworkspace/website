import { ChangeEvent, FC, useContext } from "react";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";

export const TeamInput: FC<{
    title: string;
    description: string;
    placeholder: string;
    maxLength?: number;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type: string;
}> = ({
    title,
    description,
    placeholder,
    maxLength,
    value,
    onChange,
    type,
}) => {
        const { color } = useContext(ThemeContext);

        return (
            <div className="flex xl:flex-col gap-3 w-full">
                <div className="flex flex-col items-start justify-center flex-grow h-14">
                    <h1 className="font-bold text-lg">{title}</h1>
                    <span>{description}</span>
                </div>
                <form className="w-[50%] xl:w-full xl:h-14 flex flex-row">
                    <div className="w-full">
                        <input
                            placeholder={placeholder}
                            maxLength={maxLength || 9999}
                            value={value}
                            onChange={onChange}
                            className={`bg-transparent disabled:opacity-5 focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`}
                            type={type}
                        />
                    </div>
                </form>
            </div>
        );
    };
