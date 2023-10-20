import React, { ChangeEvent, useContext, useState } from "react";
import ReactMarkdown from 'react-markdown';
import { borderAndBg } from "../../utils/theme/border&bg";
import { ThemeContext } from "../../contexts/ThemeContext";

interface InputProps {
    register: any;
    name: string;
    data?: any
    required?: boolean;
    text: string;
    inputType?: React.HTMLInputTypeAttribute;
    title: string;
    errors: any;
    disabled?: boolean;
    type: "textarea" | "input" | "textlong";
    rows?: number;
    maxLength?: number;
    minLength?: number;
    cols?: number;
    preview?: boolean;
    optional?: boolean;
    setPreview?: any | ((value: boolean) => void);
}

export const Input: React.FC<InputProps> = ({ register, name, required, text, title, errors, type, preview, setPreview, maxLength, minLength, inputType, optional, disabled }) => {
    const [markdown, setMarkdown] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(event.target.value);
    };

    const renderMarkdown = () => {
        return (
            <ReactMarkdown className="
            prose
            prose-p:before:content-none
            prose-p:after:content-none
            prose-code:before:content-none
            prose-code:after:content-none
            prose-code:p-1
            prose-code:rounded-md
            prose-hr:text-white
            prose-lead:text-white
            prose-blockquote:text-white
            prose-headings:text-white
            prose-h1:text-white
            prose-h2:text-white
            prose-h3:text-white
            prose-h4:text-white
            prose-h5:text-white
            prose-h6:text-white
            prose-p:text-white
            prose-a:text-blue-500
            prose-a:hover:text-blue-700
            prose-a:transition-colors
            prose-a:duraton-300
            prose-figure:text-white
            prose-figcaption:text-white
            prose-strong:text-white
            prose-em:text-white
            prose-code:text-white
            prose-pre:text-white
            prose-ol:text-white
            prose-ul:text-white
            prose-li:text-white
            prose-table:text-white
            prose-thead:text-white
            prose-tr:text-white
            prose-th:text-white
            prose-td:text-white
            prose-img:text-white
            prose-video:text-white
            ">{markdown.replace(/\n/g, '  \n')}</ReactMarkdown>
        );
    };


    return type === "input" ? (
        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                <div className="items-center justify-center flex gap-3">
                    <strong>{title}</strong>
                    {!optional && <div className="text-red-500">*</div>}
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
                        maxLength={maxLength}
                        minLength={minLength}
                        type={inputType}
                        disabled={disabled} 
                        className="bg-transparent outline-none w-[100%] disabled:opacity-50"
                    />
                </div>
            </div>
        </div>
    ) : type === "textlong" ? (
        <div className={`text-white xl:w-[88vw] w-[100%] xl:flex-col ${preview ? "flex-col" : "flex-row"} flex items-center justify-center`}>
            <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                <div className="items-center justify-center flex gap-3">
                    <strong>{title}</strong>
                    {!optional && <div className="text-red-500">*</div>}
                </div>
                <span className="text-center">
                    Digite todos os detalhes do seu bot, não exite em
                    colocar informações!
                </span>
                <div className="flex items-center justify-center my-2">
                    <button type="button" className="bg-neutral-900 p-1 rounded-lg border-2 border-neutral-700 transition-colors duration-300 hover:bg-neutral-700" onClick={() => setPreview(!preview)}>{preview ? "Ocultar preview" : "Mostrar preview"}</button>
                </div>
            </div>
            <div className={`flex flex-col items-center w-[100%] ${preview ? "" : "max-w-[800px] xl:max-w-[9999px]"}`}>
                <div
                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.long_description?.message === ""
                        ? "border-[#ff0000]"
                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                        } text-white`}
                >
                    <textarea
                        disabled={disabled}
                        value={markdown}
                        {...register(name, {
                            required: true,
                        })}
                        onChange={handleInputChange}
                        rows={5}
                        maxLength={2048}
                        minLength={200}
                        cols={22}
                        name={name}
                        className="bg-transparent outline-none w-[100%] scrollbar-thin disabled:opacity-50"
                    />
                </div>
                {preview &&
                    <div className="max-w-[616px] break-all flex bg-neutral-800 p-2 min-w-[99%] rounded-lg rounded-t-none">
                        <span>{renderMarkdown()}</span>
                    </div>
                }
            </div>
        </div>
    ) : (
        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
            <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                <div className="items-center justify-center flex gap-3">
                    <strong>{title}</strong>
                    {!optional && <div className="text-red-500">*</div>}
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
                        disabled={disabled}
                        {...register(name, { required } || { required: true })}
                        name={name}
                        rows={5}
                        maxLength={200}
                        minLength={200}
                        cols={22}
                        className="bg-transparent outline-none w-[100%] disabled:opacity-50"
                    />
                </div>
            </div>
        </div>
    )
};

export const TagInput: React.FC<{
    register: any;
    title: string;
    text: string;
    required: boolean;
    name: string;
    errors: any;
    disabled?: boolean;
}> = ({ register, title, text, required, name, errors, disabled }) => {
    const { color } = useContext(ThemeContext);
    const [inputValue, setInputValue] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const maxTags = 5;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const values = value.split(",").map((value) => value.trim());

        if (values.length <= maxTags) {
            setInputValue(value);
            setTags(values);
        } else {
            setInputValue(tags.slice(0, maxTags).join(", "));
        }
    };

    return (
        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex max-w-[1062px]">
            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                <div className="items-center justify-center flex gap-3">
                    <strong>{title}</strong>
                    <div className="text-red-500">*</div>
                </div>
                <span className="text-center">{text}</span>
            </div>
            <div className="flex flex-col items-center w-[100%] gap-2">
                <div
                    className={`justify-center flex outline-none max-w-[600px] xl:max-w-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors && errors[name]?.message === ""
                        ? "border-[#ff0000]"
                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                        } text-white`}
                >
                    <input
                        disabled={disabled}
                        {...register(name, { required } || { required: true })}
                        name={name}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="bg-transparent outline-none w-[100%] disabled:opacity-50"
                    />
                </div>
                <div className="flex flex-row gap-3 flex-wrap w-[100%] break-all">
                    {tags.map((tag, index) => (
                        <div key={index} className={`${borderAndBg[color]} p-[6px] rounded-lg border-2`}>{tag}</div>
                    ))}
                </div>
                {tags.length >= maxTags && (
                    <div className="text-red-500">Limite de tags atingido (máximo 5).</div>
                )}
            </div>
        </div>
    );
};
