import { FC, useState, useEffect } from "react";
import { AuditLogStructure } from "../../types";
import api from "../../utils/api";

const actionType = {
    "MemberAdd": 0,
    "MemberRemove": 1,
    "MemberUpdate": 2,
    "TeamOwnershipTransfer": 3,
    "TeamUpdate": 4,
    "BotAdd": 5,
    "BotRemove": 6,
    "InviteUpdate": 7,
};

export const AuditLogs: FC<{ teamID: string }> = ({ teamID }) => {
    const [logs, setLogs] = useState<AuditLogStructure>();

    const getAuditLogs = async () => {
        const { data } = await api.getAuditLogs(teamID);

        return setLogs(data);
    };

    useEffect(() => {
        getAuditLogs();
    }, []);

    return (
        <section>
            <span className="text-white xl:text-[26px] text-[26px] font-bold m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">Registro de auditoria</span>
            {logs ? (
                <div className="flex gap-3 flex-col w-full">
                    {logs.entries.map((log, index) => (
                        <div key={index} className="bg-neutral-800 w-full p-3 rounded-lg">
                            <span>oi</span>
                            <div>
                                {log.changes.map((change, index) => (
                                    log.action_type === actionType.MemberUpdate && (
                                        <div>{JSON.stringify(change.new_value)}</div>
                                    )
                                ))}
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