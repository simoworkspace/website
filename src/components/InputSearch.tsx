import searchIcon from '../assets/svg/search.svg';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

export const InputSearch = () => {
    const [valorInput, setValorInput] = useState<string>('');
    const [menuAberto, setMenuAberto] = useState<boolean>(false);
    const [allBots, setAllBots] = useState<boolean | any>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValorInput(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const fetchData = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/findbotname/${valorInput.toLowerCase()}`, { headers: { Authorization: import.meta.env.VITE_API_KEY as string } });
            const raleu = await res.json();
            console.log(raleu)
            setAllBots(raleu);
        };
        fetchData()
    };

    return (
        <div className='flex w-[1600px] xl:hidden'>
            <form onFocus={() => { return setMenuAberto(true) }} onBlur={() => { return setMenuAberto(false) }} onSubmit={handleSubmit} className='flex items-center bg-[#0a0e16] border-[#8b8b8b] border-[2px] p-2 mt-2 mb-[10px] rounded-[10px] h-[55px] w-[100%] max-w-[600px] focus-within:border-[#4c60ac] transition-all duration-500ms'>
                <input onChange={handleChange} className='outline-none bg-[#0a0e16] w-[100%] h-[100%] text-white border-[#8b8b8b]' type='text' placeholder='Pesquise por um bot.' />
                <button type="submit"><img src={searchIcon} alt='Search Icon' /></button>
            </form>
            {menuAberto &&
                <div className='bg-black absolute top-[60px] w-[600px]'>
                    <div>oi</div>
                </div>
            }
        </div>
    )
};