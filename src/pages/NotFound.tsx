import catImage from ".././assets/image/404.jpeg";

export const NotFound = () => {
    return (
        <div className="flex justify-center h-[80vh]">
            <img
                className="flex w-[min(100%,600px)] object-contain"
                src={catImage}
                alt="404 status code cat image UwU"
            ></img>
        </div>
    );
};
