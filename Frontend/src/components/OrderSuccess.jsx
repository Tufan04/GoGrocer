import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const OrderSuccess = () => {
    const navigate = useNavigate();
    const { width, height } = useWindowSize();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 100); // Smooth animation effect
        setTimeout(() => {
            setShow(false);
            navigate("/", { replace: true });
        }, 2000);
    }, []);

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-85 z-50 flex justify-center items-center">
            <div className="flex items-center justify-center max-w-md w-full bg-transparent rounded-xl">
                {show && <Confetti width={width} height={height} />}

                <div className={`bg-white shadow-lg rounded-xl p-8 text-center transition-transform duration-500 ease-out transform ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
                    <h2 className="text-2xl font-bold text-green-600 animate-bounce">
                        🎉 Order Placed Successfully! 🎉
                    </h2>
                    <p className="text-gray-700 mt-3">
                        Your order has been confirmed. We will notify you once it is shipped! 🚀
                    </p>
                    <p className="text-blue-700 mt-3 font-semibold">
                        Thank You for shopping with us!
                    </p>

                    {/* <button
                        onClick={() => navigate("/", { replace: true })}
                        className="mt-5 bg-blue-600 text-white py-2 px-6 rounded-full text-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        🏠 Go to Home
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
