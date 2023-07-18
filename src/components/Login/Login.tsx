export const LoginButton: React.FC = () => {
    return (
        <div className="flex text-white w-[200px] h-[50px] xl:hidden">
            <a className="flex text-white items-center h-[100%] w-[80%] justify-center border-[#858585] border-[1px] bg-black p-6 transition-colors duration-300 hover:bg-neutral-950 hover:border-white" href={import.meta.env.VITE_AUTH_LINK as string}>
                <div>Login</div>
            </a>
        </div>
    )
};