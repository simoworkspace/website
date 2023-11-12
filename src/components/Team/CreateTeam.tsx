import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorStructure, Team } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Input } from "../Addbot/Input";
import { borderColor } from "../../utils/theme/border";
import { shadowColor } from "../../utils/theme/shadow";
import { UserContext } from "../../contexts/UserContext";
import api from "../../utils/api";
import { buttonColor } from "../../utils/theme/button";
import * as icon from "react-icons/ai";
import { PopUpError } from "../Mixed/Error";
import { ApiErrors } from "../../utils/api/errors";

export const CreateTeam: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Team>();

    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [error, setError] = useState<ErrorStructure>();
    const [submited, setSubmited] = useState<boolean>(false);

    if (!user) {
        window.location.href = "/";
    }

    const onSubmit: SubmitHandler<Team> = async (data: Team): Promise<void> => {
        setSubmited(true);

        const { avatar_url, description, name, invite_hash } = data;

        const formData: Team = {
            avatar_url,
            description,
            name,
            invite_hash,
            members: []
        };

        try {
            await api.createTeam(formData);

            window.location.href = "/dashboard/settings";
        } catch (error: any) {
            setSubmited(false);
            setError({
                show: true,
                title: "Erro ao tentar criar um time",
                //@ts-ignore
                message: ApiErrors[error.response.data.code]
            });
        }
    };

    return (
        <div className="mb-[70px] p-3 w-screen flex items-center justify-center">
            <div className={`bg-neutral-900 border-2 shadow-lg transition-all duration-300 ${borderColor[color]} ${shadowColor[color]} rounded-lg p-2`}>
                <div className="xl:mb-[0px] flex gap-1 justify-start flex-col items-center">
                    <h1 className="text-white xl:text-[26px] text-[40px] m-5 xl:m-0 xl:mt-2">
                        <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                            <strong className="text-[#ffffff] xl:text-[28px] xl:mr-0 mr-2">
                                Crie seu time
                            </strong>
                        </h1>
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="gap-5 items-center justify-center pt-1 flex flex-col">
                        <div className="flex flex-col gap-3">
                            <Input errors={errors} required name="name" register={register} text="Digite o nome que o seu time irá receber" title="Nome" type="input" maxLength={15} minLength={3} placeholder="Mango Team" />
                            <Input errors={errors} required name="avatar_url" register={register} text="Coloque o link de imagem do avatar do seu time" title="Avatar em URL" inputType="url" type="input" placeholder="https://i.imgur.com/1DBO2wh.jpeg" />
                            <Input errors={errors} name="description" register={register} text="Digite uma breve descrição sobre seu time" title="Descrição" optional type="input" placeholder="Meu time é um time legal e bonito..." maxLength={50} minLength={5} />
                        </div>
                        <div className="flex justify-center m-4 xl:m-0 xl:w-full xl:mb- items-center gap-3">
                            <input
                                type="submit"
                                value="Criar time"
                                disabled={submited}
                                className={`disabled:cursor-default disabled:opacity-70 cursor-pointer transition-all duration-300 items-center border-2 w-[300px] rounded-xl h-[60px] text-white xl:w-full ${buttonColor[color]}`}
                            />
                            {submited && <icon.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                        </div>
                    </form>
                </div>
            </div>
            {error?.show && <PopUpError setShow={setError} show={error} />}
        </div>
    );
};
