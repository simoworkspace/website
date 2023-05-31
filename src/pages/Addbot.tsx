import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '../../config.json';

export const Addbot: React.FC = () => {
    /*
    {
        _id: '',
        prefix: '',
        longDescription: '',
        shortDescription: '',
        sourceCode: '',
        websiteURL: '',
        supportServer: '',
        tags: []
    }
    */
    const [inputs, setInputs] = useState<any>({});

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values: any) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setInputs(inputs)
        console.log(inputs)
        const { _id, prefix, longDescription, shortDescription, sourceCode, websiteURL, supportServer, tags } = inputs;
        
        const body: any= {
            _id: _id,
            prefix: [prefix],
            longDescription: longDescription,
            shortDescription: shortDescription,
            sourceCode: sourceCode, 
            websiteURL: websiteURL, 
            supportServer: supportServer,
            tags: tags
        }

        console.log(body)

        const oi = async () => {
            const fetchapi = await fetch(`${API_URL}/bot/${_id}`, {
                method: 'POST',
                headers: {
                    Authorization: API_KEY
                },
                body: JSON.stringify(body)
            })
            const res = await fetchapi.json();
            return console.log(res)
        }
        oi()

    };

    return (
        <div className='xl:mb-[80px] flex gap-1 justify-center flex-col items-center'>
            <h1 className='text-white text-[40px] m-5'>Adicione seu <strong className='text-roxo-legal'>Bot</strong>!</h1>
            <form onSubmit={handleSubmit} className='gap-5 items-center flex flex-col m-0'>
                <div className='text-white xl:w-[98vw] xl:flex-col flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>ID</strong></div>
                        <span>Você consegue encontrar o id do seu bot no <a className='text-blue-600 hover:outline' href='https://discord.com/developers/applications'>Discord Developer Portal</a></span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='_id' value={inputs._id || ''} className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Prefixo</strong></div>
                        <span>Me diga qual o prefixo do seu bot, caso não tenha, só escrever slash.</span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='prefix' value={inputs.prefix || ''} className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col  flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Descrição longa</strong></div>
                        <span>Digite todos os detalhes do seu bot, não exite em colocar informações!</span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='longDescription' value={inputs.longDescription || ''} className='outline-none justify-center bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col  flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Descrição Curta</strong></div>
                        <span>Digite uma descrição curta, oque irá aparecer na lista como destaque.</span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='shortDescription' value={inputs.shortDescription || ''} className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col  flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Source Code</strong></div>
                        <span>Digite o site onde tem o código fonte do bot (opcional) </span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='sourceCode' value={inputs.sourceCode || ''} className='outline-none justify-center bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col  flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Website</strong></div>
                        <span>Digite o website onde se encontra informações do seu bot.</span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='websiteURL' value={inputs.websiteURL || ''} className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col  flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Servidor de suporte</strong></div>
                        <span>Coloque o link do seu servidor de discord onde é o suporte do seu bot (discord.gg/)</span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='supportServer' value={inputs.supportServer || ''} className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white xl:w-[98vw] xl:flex-col  flex-row flex'>
                    <div className='w-[800px] xl:w-[100%] break-words flex-col flex mr-2'>
                        <div className='xl:text-center'><strong>Tags</strong></div>
                        <span>Digite as palavras chaves das características que seu bot possui, separe por virgula (moderação, administração)</span>
                    </div>
                    <div className='flex w-[100%]'>
                        <textarea onChange={handleChange} name='tags' value={inputs.tags || ''} className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='flex justify-center m-4'>
                    <input type='submit' className='cursor-pointer hover:bg-[#2d2dda] focus:duration-0 transition-all duration-300 items-center bg-[#5353eb] w-[300px] rounded-xl h-[60px] text-white focus:outline focus:outline-offset-2 focus:outline-white focus:utline-2' value='Enviar bot' />
                </div>
            </form>
        </div>
    );
};