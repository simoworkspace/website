export const Addbot = () => {
    return (
        <div className='flex gap-1 justify-center flex-col items-center'>
            <h1 className='text-white text-[40px] m-5'>Adicione seu <strong className='text-roxo-legal'>Bot</strong>!</h1>
            <form className='gap-5 w-[99vw] items-center flex flex-col m-0'>
                <div className='text-white w-[800px] flex-row flex m-auto'>
                    <div className='w-[600px] flex-col flex mr-2'>
                        <div><strong>ID</strong></div>
                        <span>Você consegue encontrar o id do seu bot no <a className='text-blue-600 hover:outline' href='https://discord.com/developers/applications'>Discord Developer Portal</a></span>
                    </div>
                    <div className='flex w-[1000px]'>
                        <input className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' type='text' />
                    </div>
                </div>
                <div className='text-white w-[800px] flex-row flex m-auto'>
                    <div className='w-[600px] flex-col flex mr-2'>
                        <div><strong>Prefixo</strong></div>
                        <span>Me diga qual o prefixo do seu bot, caso não tenha, só escrever slash.</span>
                    </div>
                    <div className='flex w-[1000px]'>
                        <input className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' type='text' />
                    </div>
                </div>
                <div className='text-white w-[800px] flex-row flex m-auto'>
                    <div className='w-[600px] flex-col flex mr-2'>
                        <div><strong>Descrição longa</strong></div>
                        <span>Digite todos os detalhes do seu bot, não exite em colocar informações!</span>
                    </div>
                    <div className='flex w-[1000px]'>
                        <textarea className='outline-none justify-center bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white w-[800px] flex-row flex m-auto'>
                    <div className='w-[600px] flex-col flex mr-2'>
                        <div><strong>Descrição Curta</strong></div>
                        <span>Digite uma descrição curta, oque irá aparecer na lista como destaque.</span>
                    </div>
                    <div className='flex w-[1000px]'>
                        <input className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' type='text' />
                    </div>
                </div>
                <div className='text-white w-[800px] flex-row flex m-auto'>
                    <div className='w-[600px] flex-col flex mr-2'>
                        <div><strong>Source Code</strong></div>
                        <span>Digite o site onde tem o código fonte do bot (opcional) </span>
                    </div>
                    <div className='flex w-[1000px]'>
                        <textarea className='outline-none justify-center bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' />
                    </div>
                </div>
                <div className='text-white w-[800px] flex-row flex m-auto'>
                    <div className='w-[600px] flex-col flex mr-2'>
                        <div><strong>Website</strong></div>
                        <span>Digite o website onde se encontra informações do seu bot.</span>
                    </div>
                    <div className='flex w-[1000px]'>
                        <input className='outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] border-[#8b8b8b] transition-all duration-100 hover:border-roxo-legal focus-within:border-roxo-legal text-white' type='text' />
                    </div>
                </div>
                <div className='flex justify-center m-4'>
                    <button className='cursor-pointer hover:bg-[#2d2dda] focus:duration-0 transition-all duration-300 items-center bg-[#5353eb] w-[300px] rounded-xl h-[60px] text-white focus:outline focus:outline-offset-2 focus:outline-white focus:utline-2'>
                        <span>Enviar bot</span>
                    </button>
                </div>
            </form>
        </div>
    )
};