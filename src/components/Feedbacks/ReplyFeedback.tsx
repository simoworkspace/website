import { FC, ChangeEvent, useState, FormEvent } from "react";
import { BotStructure, FeedbackStructure, Theme, UserStructure } from "../../types";
import api from "../../utils/api";
import { borderColor } from "../../utils/theme/border";
import * as iconAI from "react-icons/ai";
import * as icon from "react-icons/bs";
import { buttonColor } from "../../utils/theme/button";
import simo from "../../assets/images/simo.png";
import moment from "moment";
import "moment/dist/locale/pt-br";

export const ReplyFeedbackCard: FC<{
    feedback: FeedbackStructure;
    updateFeedbacks: () => Promise<void>;
    bot: BotStructure;
    user: UserStructure | null;
    color: Theme;
    reply: boolean;
  }> = ({ feedback, updateFeedbacks, bot, user, color, reply }): any => {
    const [isEditReply, setIsEditReply] = useState<boolean>();
    const [replyContent, setReplyContent] = useState<string>();
    const [editedReplyContent, setEditedReplyContent] = useState<string>();
    const [replySubmit, setReplySubmit] = useState<boolean>(false);
    const [submited, setSubmited] = useState<boolean>(false);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);

    const handleReplySend = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setReplyContent(event.target.value);
    };

    const handleEditReply = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setEditedReplyContent(event.target.value);
    };

    const handleEditReplyFeedback = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        setSubmited(true);

        if (replyContent === feedback.reply_message?.content) {
            setSubmited(false);
            setIsEditReply(false);
            return;
        }

        event.preventDefault();

        await api.editFeedback(bot._id, {
            reply_message: {
                content: editedReplyContent,
                edited: true
            }
        });
        await updateFeedbacks();

        setSubmited(false);
        setIsEditReply(false);
    };

    const handleReplyFeedback = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setReplySubmit(true);

        await api.editFeedback(bot._id, {
            reply_message: {
                content: replyContent,
                posted_at: new Date().toISOString()
            }
        });

        await updateFeedbacks();
        setReplySubmit(false);
    };

    return (
        feedback?.reply_message && user && (
            isEditReply ? (
                <form onSubmit={handleEditReplyFeedback} className="flex flex-row gap-3 w-full">
                    <div className="flex flex-col gap-3 h-42 items-center justify-center">
                        <img className="rounded-full w-8" src={`https://cdn.discordapp.com/avatars/${user._id}/${user.avatar}.png`} />
                        <div className="h-full py-3 bg-neutral-800 rounded-lg w-1" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className={`bg-neutral-800 rounded-lg ${borderColor[color]} border-2 text-white w-full`}>
                            <textarea defaultValue={feedback.reply_message.content} rows={4} onChange={handleEditReply} className="bg-transparent w-full focus:outline-none p-2" cols={22} required placeholder="Digite aqui" maxLength={500} />
                        </div>
                        <div className="flex gap-3 items-center justify-center">
                            <input disabled={submited} className={`disabled:cursor-default disabled:opacity-70 border-2 duration-300 transition-all cursor-pointer ${buttonColor[color]} p-3 rounded-lg w-full text-white`} type="submit" value="Enviar" />
                            {submited && <iconAI.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                        </div>
                    </div>
                </form>
            ) : (
                <div className="flex flex-row gap-2 items-start justify-center h-full my-1 border-l-neutral-800 border-l-[3px]">
                    <div className="flex items-start w-full flex-col mx-2 my-1">
                        <div className="flex items-center">
                            <img
                                src={`https://cdn.discordapp.com/avatars/${user._id}/${user.avatar}.png`}
                                className="w-[30px] h-[30px] rounded-full"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = simo;
                                }}
                            />
                            <span className="p-1 ml-1">{user.username}</span>
                            <span className="text-neutral-500">{moment(feedback.reply_message.posted_at).fromNow()}</span>
                        </div>
                        <div className="py-2">{feedback.reply_message.content}{feedback?.reply_message.edited && <span className="text-neutral-500"> (editado)</span>}</div>
                    </div>
                    {user?._id === bot.owner_id && (
                        <div className="flex gap-3 justify-end w-full">
                            <button onClick={async () => {
                                setIsDeleted(true);
                                await api.editFeedback(bot._id, { reply_message: {} });
                                await updateFeedbacks();
                                setIsDeleted(false);
                            }} className="flex justify-end">
                                {!isDeleted ? <icon.BsTrash size={20} className="hover:fill-red-500 transition-colors duration-300" /> : <iconAI.AiOutlineLoading3Quarters fill="#fff" size={20} className="animate-spin" />}
                            </button>
                            <button onClick={() => {
                                setIsEditReply(!isEditReply);
                            }} className="flex justify-end">
                                <icon.BsPencilSquare size={20} className="hover:fill-amber-500 transition-colors duration-300" />
                            </button>
                        </div>
                    )}
                    {reply && user && (
                        <form onSubmit={handleReplyFeedback} className="flex flex-row gap-3 w-full h-full">
                            <div className="flex flex-col gap-3 h-42 items-center justify-center">
                                <img className="rounded-full w-8" src={`https://cdn.discordapp.com/avatars/${user._id}/${user.avatar}.png`} />
                                <div className="h-full py-3 bg-neutral-800 rounded-lg w-1" />
                            </div>
                            <div className="flex w-full flex-col gap-3">
                                <div className={`bg-neutral-800 rounded-lg ${borderColor[color]} border-2 text-white w-full`}>
                                    <textarea rows={4} onChange={handleReplySend} className="bg-transparent w-full focus:outline-none p-2" cols={22} required placeholder="Digite aqui" maxLength={500} />
                                </div>
                                <div className="flex gap-3 items-center justify-center">
                                    <input disabled={submited} className={`disabled:cursor-default disabled:opacity-70 border-2 duration-300 transition-all cursor-pointer ${buttonColor[color]} p-3 rounded-lg w-full text-white`} type="submit" value="Enviar" />
                                    {replySubmit && <iconAI.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            ))
    );
};