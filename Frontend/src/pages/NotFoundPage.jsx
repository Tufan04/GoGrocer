import { useNavigate } from "react-router-dom";
import NotFound from "../assets/NotFound.png"

const NotFoundPage = () => {
    const navigate = useNavigate()
    const redirectToHomeHandler = () => {
        navigate("/", { replace: true })
    }
    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] bg-gray-100 p-6">
            <div className="text-center">
                <img src={NotFound} alt="" className="w-96" />
                <p className="text-xl text-gray-600 mt-2">Oops! The page you are looking for does not exist.</p>
                <button onClick={redirectToHomeHandler}
                    className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
