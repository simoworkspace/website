import { FC } from "react";
import { AuditLogActionType, AuditLogStructure, VanityURLUpdateChange } from "../../types";
import moment from "moment";
import "moment/dist/locale/pt-br";
import { Link } from "react-router-dom";

const changedKeysNames: Record<string | number, string> = {
    name: "o nome",
    avatar_url: "o avatar",
    permission: "a permissão",
    description: "a descrição",
    bot_id: "id do bot",
    invite_code: "o código de convite",
    vanity_url: "o código de convite personalizado",
    0: "Administrador",
    1: "Membro",
    3: "Dono"
};

export const AuditLogs: FC<{ logs: AuditLogStructure | undefined }> = ({ logs }) => {
    return (
        <section>
            <span className="text-white xl:text-[26px] text-[26px] font-bold m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">Registro de auditoria</span>
            {logs ? (
                <div className="flex gap-3 flex-col w-full">
                    {logs.entries.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((log, index) => (
                        <div key={index} className="bg-neutral-800 w-full p-3 rounded-lg flex gap-2 items-start">
                            <Link to={`/user/${log.executor.id}`}>
                                <img onError={async ({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                }} className="rounded-full w-12 h-12 flex-shrink-0" src={`https://cdn.discordapp.com/avatars/${log.executor.id}/${log.executor.avatar}.png`} />
                            </Link>
                            <div className="flex flex-col gap-1 flex-grow">
                                <div>
                                    {log.action_type === 0 ? (
                                        <div><strong>{log.target?.username}</strong> entrou no time</div>
                                    ) : log.action_type === 1 ? (
                                        <span><strong>{log.executor.username}</strong> removeu o membro <strong>{log.target?.username}</strong></span>
                                    ) : (
                                        log.changes.map((change, index) => (
                                            <div className="flex flex-col break-word max-w-3xl xl:max-w-[50vw]" key={index}>
                                                {(() => {
                                                    switch (log.action_type) {
                                                        case AuditLogActionType.MemberUpdate:
                                                            return <span><strong>{log.executor.username}</strong> atualizou as permissões para <strong>{log.target?.username}</strong> de <strong>{changedKeysNames[change.old_value]}</strong> para <strong>{changedKeysNames[change.new_value as string] || change.new_value}</strong></span>;
                                                        case AuditLogActionType.BotAdd:
                                                            return <span><strong>{log.executor.username}</strong> adicionou o bot com o ID {log.target?.username}</span>;
                                                        case AuditLogActionType.TeamUpdate: {
                                                            if (change.changed_key === "vanity_url") {
                                                                const newChange = change as unknown as VanityURLUpdateChange

                                                                return <span><strong>{log.executor.username}</strong> atualizou <strong>{changedKeysNames[change.changed_key]}</strong> de <strong>{newChange.old_value?.code || "nenhum"}</strong> para <strong>{newChange.new_value?.code || ""}</strong></span>
                                                            }
                                                            return <span><strong>{log.executor.username}</strong> atualizou <strong>{changedKeysNames[change.changed_key]}</strong> de <strong>{change.old_value}</strong> para <strong>{change.new_value}</strong></span>
                                                        }
                                                        case AuditLogActionType.BotRemove:
                                                            return <span><strong>{log.executor.username}</strong> removeu o bot com o ID {log.target?.username}</span>;
                                                        case AuditLogActionType.InviteUpdate:
                                                            return <span><strong>{log.executor.username}</strong> atualizou o código de invite, de <strong>{change.old_value}</strong> para <strong>{change.new_value}</strong></span>;
                                                        default:
                                                            return <span>Ação não tratada para action_type {log.action_type}</span>;
                                                    }
                                                })()}
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div>
                                    <div className="text-neutral-400">{moment(log.created_at).locale("pt-br").fromNow()}</div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            ) : (
                <div>Carregando logs...</div>
            )}
        </section>
    )
};