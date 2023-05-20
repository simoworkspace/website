import './style.css';

export const Skeleton = () => {
    return (
        <div className='posts-bots-skeleton'>
            {Array(6).fill(
                <div className='bot-card-skeleton'>
                    <h2 className='skeleton'></h2>
                    <h1 className='skeleton'></h1>
                    <div className='skeleton'></div>
                    <section>
                        <h3 className='skeleton button-skeleton'></h3>
                        <h3 className='skeleton button-skeleton'></h3>
                    </section>
                </div>
            )}
        </div>
    )
};