import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/svg/arrow.svg';

const UserLogin: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUserData = () => {
            const userCookie = document.cookie.split('discordUser=')[1]
            if (userCookie == undefined) {
                setUser(null)
            } else {
                const userData = JSON.parse(decodeURIComponent(userCookie));
                setUser(userData);
            }
        };

        getUserData();
    }, []);

    return (
        <div>
            {user ? (
                <div className='flex text-white w-[190px] h-[50px] xl:hidden'>
                    <div className='flex items-center h-[100%] border-[#858585] border-[1px] bg-black p-6'>
                        <img className='w-[30px] h-[30px] rounded-full float-right' src='https://cdn.discordapp.com/avatars/955095844275781693/511a594d8af5dd14849cc3e16567f534.png?size=2048' alt='User Image' />
                        <div className='m-2'>Spyei</div>
                        <Link to='/auth'><img className='w-[23px] h-[23px] ml-1 rotate-180 transition-all hover:rotate-0' src={arrow} alt='Arrow Icon' /></Link>
                    </div>
                </div>
            ) : (
                <div className='flex text-white w-[140px] h-[50px] xl:hidden'>
                    <Link className='flex items-center h-[100%] w-[80%] justify-center border-[#858585] border-[1px] bg-black p-6 transition-all duration-500 hover:scale-105 hover:bg-[#1f1f1f] hover:border-white' to='https://discord.com/oauth2/authorize?client_id=1064594303181131928&redirect_uri=http%3A%2F%2Flocalhost%3A81%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds'>
                        <div>Login</div>
                    </Link>
                </div>
            )}
        </div >
    );
};

export default UserLogin;
