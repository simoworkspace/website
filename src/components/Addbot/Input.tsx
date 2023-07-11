import React from "react";

interface InputProps {
    register: any;
    name: string;
    required?: boolean;
    text: string;
    title: string;
    errors: any;
    type: "textarea" | "input";
    rows?: number;
    maxLength?: number;
    minLength?: number;
    cols?: number;
}

export const Input: React.FC<InputProps> = ({ register, name, required, text, title, errors, type }) => {
    return type === "input" ? (
        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                <div className="text-center">
                    <strong>{title}</strong>
                </div>
                <span className="text-center">{text}</span>
            </div>
            <div className="flex flex-col items-center w-[100%]">
                <div
                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors && errors[name]?.message === ""
                        ? "border-[#ff0000]"
                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                        } text-white`}
                >
                    <input
                        {...register(name, { required } || { required: true })}
                        name={name}
                        className="bg-transparent outline-none w-[100%]"
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
            <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                <div className="text-center">
                    <strong>{title}</strong>
                </div>
                <span className="text-center">
                    {text}
                </span>
            </div>
            <div className="flex flex-col items-center w-[100%]">
                <div
                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors && errors[name]?.message === ""
                        ? "border-[#ff0000]"
                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                        } text-white`}
                >
                    <textarea
                        {...register("shortDescription", {
                            required: true,
                        })}
                        name="shortDescription"
                        rows={5}
                        maxLength={200}
                        minLength={200}
                        cols={22}
                        className="bg-transparent outline-none w-[100%]"
                    />
                </div>
            </div>
        </div>
    )
};
