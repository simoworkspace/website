import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, API_URL } from '../../config.json';

export const Bot = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [botData, setBotData] = useState<boolean | any>(false);
    const [verifyBot, setVerifyBot] = useState<boolean>(true)

    useEffect(() => {
        const fetchData = async () => {
            const fetchApi = await fetch(`${API_URL}/bot/${params.botid}/discord`, { headers: { Authorization: API_KEY } })
            const res = await fetchApi.json();
            setBotData(res);
        };
        const verifyBotExists = async () => {
            const fetchApi = await fetch(API_URL + '/findbot/' + params.botid , { headers: { Authorization: API_KEY } })
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