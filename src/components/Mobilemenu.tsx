import { Link } from "react-router-dom";
import searchIcon from '../assets/svg/search.svg';
import plusIcon from '../assets/svg/plus.svg';
import listIcon from '.././assets/svg/list.svg';

export const Mobilemenu = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='hidden xl:flex w-[80vw] xl:fixed xl:items-center xl:justify-center xl:rounded-[30px] xl:bottom-2 xl:bg-[#000000]'>
                <nav className='flex w-[80vw] h-[40px]'>
                    <div className='flex flex-row'>
                        <Link to='/'>
                            <img className='bg-black' src={plusIcon} alt='Plus Icon' />
                        </Link>
                    </div>
                    <div>
                        <Link to='/'>
                            <img className='bg-black' src={listIcon} alt='Search Icon' />
                        </Link>
                    </div>
                    <div>
                        <Link to='/'>
                            <img className='bg-black' src={searchIcon} alt='Search Icon' />
                        </Link>
                    </div>
                    <div className='flex w-[100%]'>
                        <Link to='/' className='justify-end items-end'>
                            <img className='rounded-full w-14 h-14' src='https://cdn.discordapp.com/avatars/955095844275781693/511a594d8af5dd14849cc3e16567f534.png?size=2048' alt='User Image' />
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    )
};