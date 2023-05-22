import searchIcon from '../../assets/search.svg';
import React, { useState, ChangeEvent, FormEvent } from 'react';

export const Header: React.FC = () => {
    const [valorInput, setValorInput] = useState('');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValorInput(event.target.value);
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(valorInput);
    };

    return (
        <div className='border-b-[1px] border-[#8b8b8b] flex justify-center bg-gradient-to-r from-[#131720] from-[40%] to-[#0c0c0c] to-[100%] xp:flex-wrap'>
            <h1 className='text-white text-[32px] mx-10 my-3'><strong className='text-roxo-legal'>Bot</strong>List</h1>
            <form onSubmit={handleSubmit} className='flex items-center bg-[#0a0e16] border-[#8b8b8b] border-[2px] p-2 mt-2 mb-[10px] rounded-[10px] h-[55px] w-[100%] max-w-[600px] focus-within:border-[#4c60ac] transition-all duration-500ms'>
                <input className='outline-none bg-[#0a0e16] w-[100%] h-[100%] box-border text-white border-[#8b8b8b]' type='text' placeholder='Digite o nome de um bot.' value={valorInput} onChange={handleChange}/>
                <button type="submit"><img src={searchIcon} alt='Search Icon'/></button>
            </form>
        </div>
    );
};