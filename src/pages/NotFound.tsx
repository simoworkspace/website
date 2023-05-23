import catImage from '.././assets/404.jpeg';

export const NotFound = () => {
    return(
        <div className='flex justify-center'>
            <img className='flex w-[min(100%,600px)] h-[min(100%,700px)] m-10' src={catImage} alt='404 status code cat image UwU'></img>
        </div>
    )
};