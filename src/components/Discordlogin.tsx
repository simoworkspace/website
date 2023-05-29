import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from '../assets/svg/arrow.svg';
import logoutIcon from '../assets/svg/logout.svg';
import plusIcon from '../assets/svg/plus.svg';
import dashIcon from '../assets/svg/dashboard.svg';

const UserLogin: React.FC = () => {
    const [user, setUser] = useState<boolean | any>(false);


    useEffect(() => {
        const getUserData = () => {
            const userCookie: string = document.cookie.split('discordUser=')[1]
            if (!userCookie) {
                setUser(false)
            } else {
                const userData: string = JSON.parse(decodeURIComponent(userCookie));
                setUser(userData);
            }
        };

        getUserData();
    }, []);

    const [arrowState, setArrowState] = useState<boolean>(false);

    const handleSetArrow = () => setArrowState(!arrowState);

    return (
        <div>
            {user ? (
                <div>
                    <button onClick={handleSetArrow} className='flex text-white w-[190px] h-[50px] xl:hidden'>
                        <div className={`flex items-center h-[100%] transition-all duration-100 ${arrowState ? 'border-white' : 'border-[#858585]'} border-[1px] bg-black p-6 ${arrowState ? 'border-b-black' : ''}`}>
                            <img className='w-[30px] h-[30px] rounded-full float-right' src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`} alt='User Image' />
                            <div className='m-2'>{user.username}</div>
                            <div>
                                <img className={`w-[23px] h-[23px] ml-1 transition-all ${arrowState ? 'rotate-180' : 'rotate-0'}`} src={arrowIcon} alt='Arrow Icon' />
                            </div>
                        </div>
                    </button>
                    <div className={`xl:hidden transition-all duration-300 border-white border-[1px] border-t-[0px] absolute bg-black text-white w-[164px] top-[61px] ${arrowState ? 'opacity-100' : 'opacity-0'}`}>
                        <div className='flex flex-col justify-center'>
                            <button className='p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all'>
                                <div className='flex-2 flex'>
                                    <img className='mr-3' src={dashIcon} alt='Dashboard Icon' />
                                    <span>Dashboard</span>
                                </div>
                            </button>
                            <button className='p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all'>
                                <div className='flex-2 flex'>
                                    <img className='mr-3' src={plusIcon} alt='Plus Icon' />
                                    <span>Adicionar bot</span>
                                </div>
                            </button>
                            <button className='p-1 flex justify-center my-1 hover:bg-[#3a3a3a] rounded-md m-[2px] transition-all'>
                                <div className='flex-2 flex'>
                                    <img className='mr-3' src={logoutIcon} alt='Logout Icon' />
                                    <span>Sair</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='flex text-white w-[140px] h-[50px] xl:hidden'>
                    <Link className='flex items-center h-[100%] w-[80%] justify-center border-[#858585] border-[1px] bg-black p-6 transition-all duration-500 hover:scale-105 hover:bg-[#1f1f1f] hover:border-white' to='https://discord.com/oauth2/authorize?client_id=1064594303181131928&redirect_uri=http%3A%2F%2Flocalhost%3A81%2Fauth%2Fcallback&response_type=code&scope=identify%20guilds'>
                        <div>Login</div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserLogin;
