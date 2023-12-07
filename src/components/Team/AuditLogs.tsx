import { FC } from "react";
import { AuditLogStructure } from "../../types";
import moment from "moment";
import "moment/dist/locale/pt-br";

const actionType = {
    MemberAdd: 0,
    MemberRemove: 1,
    MemberUpdate: 2,
    TeamOwnershipTransfer: 3,
    TeamUpdate: 4,
    BotAdd: 5,
    BotRemove: 6,
    InviteUpdate: 7
};

const changedKeysNames: Record<string | number, string> = {
    name: "o nome",
    avatar_url: "o avatar",
    permission: "a permissão",
    description: "a descrição",
    bot_id: "id do bot",
    invite_code: "código de convite",
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
                        <div key={index} className="bg-neutral-800 w-full p-3 rounded-lg flex gap-2 break-before-auto">
                            <img className="rounded-full w-12 h-12" src={`https://cdn.discordapp.com/avatars/${log.executor._id}/${log.executor.avatar}.png`} />
                            <div className="flex flex-col gap-1">
                                <div>
                                    {log.changes.map((change, index) => (
                                        <div className="flex flex-col" key={index}>
                                            {(() => {
                                                switch (log.action_type) {
                                                    case actionType.MemberAdd:
                                                        return <span>usuário <strong>{log.target?.username}</strong> entrou no grupo</span>;
                                                    case actionType.MemberUpdate:
                                                        return <span><strong>{log.executor.username}</strong> Atualizou as permissões para <strong>{log.target?.username}</strong> de <strong>{changedKeysNames[change.old_value]}</strong> para <strong>{changedKeysNames[change.new_value as string]}</strong></span>;
                                                    case actionType.MemberRemove:
                                                        return <span><strong>{log.executor.username}</strong> removeu o membro <strong>{log.target?.username}</strong></span>
                                                    case actionType.BotAdd:
                                                        return <span><strong>{log.executor.username}</strong> adicionou o bot com o ID {log.target?.username}</span>;
                                                    case actionType.TeamUpdate:
                                                        return <span><strong>{log.executor.username}</strong> Atualizou <strong>{changedKeysNames[change.changed_key]}</strong> de <strong>{change.old_value}</strong> para <strong>{change.new_value}</strong></span>
                                                    case actionType.BotRemove:
                                                        return <span><strong>{log.executor.username}</strong> removeu o bot com o ID {log.target?.username}</span>;
                                                    case actionType.InviteUpdate:
                                                        return <span><strong>{log.executor.username}</strong> Atualizou o código de invite, de <strong>{change.old_value}</strong> para <strong>{change.new_value}</strong></span>;
                                                    default:
                                                        return <span>Ação não tratada para action_type {log.action_type}</span>;
                                                }
                                            })()}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <span className="text-neutral-400">{moment(log.created_at).locale("pt-br").fromNow()}</span>
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