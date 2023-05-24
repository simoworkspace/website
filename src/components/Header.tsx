import searchIcon from '../assets/search.svg';
import arrow from '../assets/arrow.svg';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

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
        <div className='w-[100%] border-b-[1px] border-[#8b8b8b] flex justify-center items-center bg-gradient-to-r from-[#131720] from-[40%] to-[#0c0c0c] to-[100%] xp:flex-wrap'>
            <div className='flex w-[600px]'>
                <h1 className='text-white text-[32px] mx-10 my-3'><strong className='text-roxo-legal'>Bot</strong>List</h1>
            </div>
            <div className='flex w-[1600px]'>
                <form onSubmit={handleSubmit} className='flex items-center bg-[#0a0e16] border-[#8b8b8b] border-[2px] p-2 mt-2 mb-[10px] rounded-[10px] h-[55px] w-[100%] max-w-[600px] focus-within:border-[#4c60ac] transition-all duration-500ms'>
                    <input className='outline-none bg-[#0a0e16] w-[100%] h-[100%] text-white border-[#8b8b8b]' type='text' placeholder='Pesquise por um bot.' value={valorInput} onChange={handleChange} />
                    <button type="submit"><img src={searchIcon} alt='Search Icon' /></button>
                </form>
            </div>
            <div className='flex ml-10 w-[600px] items-center'>
            <Link to='/addbot'><button className='text-white bg-[#445b86] h-[55px] rounded-[10px] p-1 border-[#3a61aa] border-2 focus:outline focus:outline-2 focus:outline-offset-2 hover:scale-110 focus:scale-110 focus:duration-0 transition-all duration-500'>Adicione seu bot!</button></Link>:
            </div>
            <div className='flex text-white w-[500px] h-[50px]'>
                <div className='flex items-center h-[100%] border-[#858585] border-[1px] bg-black p-6'>
                    <img className='w-[30px] h-[30px] rounded-full float-right' src='https://cdn.discordapp.com/avatars/955095844275781693/511a594d8af5dd14849cc3e16567f534.png?size=2048' alt='User Image' />
                    <div className='m-2'>Spyei</div>
                    <Link to='/auth'><img className='w-[23px] h-[23px] ml-1 rotate-180 transition-all hover:rotate-0' src={arrow} alt='Arrow Icon' /></Link>
                </div>
            </div>
        </div>
    );
};