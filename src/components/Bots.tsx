import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../../config.json';
import { BotType } from '../../types';
import { Botloading } from './Botloading';
import { Link } from 'react-router-dom';

export const Bots = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(API_URL + '/bot/@all', { headers: { Authorization: API_KEY } })
            const response2 = await response.json();
            setData(response2);
        }
        fetchData();
    }, [data])

    return (
        data ? (
            <div className='grid-cols-3 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left'>
                {
                    data.map((x: BotType) => (
                        <div key={x._id} className='card-bc p-1 border-transparent border-[4px] rounded-[10px]'>
                            <img className='w-[min(100%,100px)] h-[min(100%,100px)] rounded-full mt-2 mr-2 float-right' src={`https://cdn.discordapp.com/avatars/${x._id}/${x.avatar}.png?size=2048`} alt={x.name} />
                            <h1 className='text-center text-[24px]'>{x.name}</h1>
                            <div className=''>{x.description.length > 80 ? x.description.slice(0, 80) + '...' : x.description}</div>
                            <div className='mt-2 ml-2 mb-2 flex flex-col'>
                                <div>
                                    <Link to={`https://discord.com/api/oauth2/authorize?client_id=${x._id}&permissions=70368744177655&scope=bot%20applications.commands`}>
                                        <button className='max-w-full max-h-full w-[170px] h-[40px] bg-gradient-to-l from-blue-button1 via-blue-button2 to-blue-button1 border-2 border-black text-white rounded-full hover:bg-right bg-[length:250%] transition-bg duration-500 hover:scale-110 focus:scale-110 focus:bg-right focus:outline focus:outline-1 focus:outline-offset-1 focus:utline-1 focus:duration-0'>
                                            Adicionar
                                        </button>
                                    </Link>
                                </div>
                                <div>
                                    <Link to={`/bot/${x._id}`}>
                                        <button className='max-w-full max-h-full w-[170px] h-[40px] bg-gradient-to-l from-blue-button1 via-blue-button2 to-blue-button1 border-2 border-black text-white rounded-full mt-2 hover:bg-right bg-[length:250%] transition-bg duration-500 hover:scale-110 focus:scale-110 focus:bg-right focus:outline focus:outline-1 focus:outline-offset-1 focus:utline-1 focus:duration-0'>
                                            Mais informações
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) : (<Botloading></Botloading>)
    );
}