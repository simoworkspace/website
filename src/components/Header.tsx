import searchIcon from '../assets/svg/search.svg';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLogin from './Discordlogin';

export const Header: React.FC = () => {
    return (
        <div className='w-[100%] border-b-[1px] border-[#8b8b8b] flex justify-center items-center bg-gradient-to-r from-[#131720] from-[40%] to-[#0c0c0c] to-[100%] xp:flex-wrap'>
            <div className='flex w-[600px] xl:w-[100vw] xl:justify-center'>
                <h1 className='text-white text-[32px] mx-10 my-3'><strong className='text-roxo-legal'>Bot</strong>List</h1>
            </div>
            <div className='flex w-[1600px] xl:hidden'>
                <form className='flex items-center bg-[#0a0e16] border-[#8b8b8b] border-[2px] p-2 mt-2 mb-[10px] rounded-[10px] h-[55px] w-[100%] max-w-[600px] focus-within:border-[#4c60ac] transition-all duration-500ms'>
                    <input className='outline-none bg-[#0a0e16] w-[100%] h-[100%] text-white border-[#8b8b8b]' type='text' placeholder='Pesquise por um bot.' />
                    <button type="submit"><img src={searchIcon} alt='Search Icon' /></button>
                </form>
            </div>
            <UserLogin/>
        </div>
    );
};
