import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Bot = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [botData, setBotData] = useState<boolean | any>(false);
    const [verifyBot, setVerifyBot] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchApi = await fetch(`${import.meta.env.VITE_API_URL}/bot/${params.botid}/discord`, { headers: { Authorization: import.meta.env.VITE_API_KEY as string } })
            const res = await fetchApi.json();
            setBotData(res);
        };
        const verifyBotExists = async () => {
            const fetchApi = await fetch(import.meta.env.VITE_API_URL + '/findbot/' + params.botid , { headers: { Authorization: import.meta.env.VITE_API_KEY as string } })
            const res = await fetchApi.json();
            console.log(res.message)
            if(res.length == 0) return setVerifyBot(false)
        };
        verifyBotExists();
        fetchData();
    }, [])

    if(!verifyBot) navigate('/notfound')

    console.log(botData)

    return (
        botData ?  
        <img src={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png?size=2048`} alt='Bot Avatar' />
        :
        <div>loading...</div>
    );
};