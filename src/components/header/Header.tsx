import searchIcon from '../../assets/search.svg';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import './style.css';

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
        <header>
            <h1 className='text-white text-[32px] mx-10 my-3'><strong>Bot</strong>List</h1>
            <form onSubmit={handleSubmit} className='pesquisar-bot-form'>
                <input type='text' placeholder='Digite o nome de um bot.' value={valorInput} onChange={handleChange}/>
                <button type="submit"><img src={searchIcon} alt='Search Icon'/></button>
            </form>
        </header>
    );
};