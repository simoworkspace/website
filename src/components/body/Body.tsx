import { useState, useEffect } from 'react';
import './style.css';
import { API_KEY, API_URL } from '../../../config.json';
import { BotType } from '../../../types';
export const Body = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL + '/bots', { headers: { Authorization: API_KEY } })
            const response2 = await response.json();
            setData(response2);
        }
        fetchData();
    }, [])

    return (
        data ? (
            <div className='posts-bots'>
                {
                    data.map((x: BotType) => (
                        <div key={x._id} className='bot-card'>
                            <img src={`https://cdn.discordapp.com/avatars/${x._id}/${x.avatar}.png?size=2048`} alt={x.name} />
                            <h1>{x.name}</h1>
                            <div>{x.description.length > 80 ? x.description.slice(0, 80) + '...' : x.description}</div>
                            <div className='buttons'>
                                <div><button className='button-adicionar-bot'>Me Adicione</button></div>
                                <div><button className='button-pagina-bot'>Mais informações</button></div>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) : (
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        )
    );
}