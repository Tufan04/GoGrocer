import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/AxiosInstance";
import { verifyEmailUrl } from "../config/ApiUrl";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const VerifyEmail = () => {
    const { code } = useParams();
    const [verified, setVerified] = useState(false);
    const [alreadyVerified, setAlreadyVerified] = useState(false);
    const { width, height } = useWindowSize();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => setShow(true), 200); // Smooth entry animation
    }, []);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axiosInstance.post(verifyEmailUrl, { code });
                if (response.data.success) {
                    if (response.data.already_verified) {
                        setAlreadyVerified(true);
                    } else {
                        setVerified(true);
                    }
                }
            } catch (error) {
                toast.error("Verification failed. Please try again.");
            }
        };
        verifyEmail();
    }, [code]);
    useEffect(() => {
        if (verified || alreadyVerified) {
            setTimeout(() => {
                navigate("/login", { replace: true })
            }, 2000);
        }
    }, [verified, alreadyVerified])

    return (
        <div className="flex justify-center items-center  h-[calc(100vh-10rem)] lg:h-[calc(100vh-5rem)] bg-gray-100">
            {verified && <Confetti width={width} height={height} className="w-full " />}
            <div
                className={`bg-white shadow-lg rounded-xl p-6 w-96 text-center transition-all duration-500 transform ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    }`}
            >
                {
                    alreadyVerified ? (
                        <div>
                            <h2 className="text-2xl font-bold text-green-600 animate-bounce">
                                🎉 Email Already Verified 🎉
                            </h2>
                            <p className="text-blue-500 mt-2">
                                Redirecting to login....
                            </p>
                        </div>
                    ) : (
                        verified ? (
                            <div>
                                <h2 className="text-2xl font-bold text-green-600 animate-bounce">
                                    🎉 Yooyah! Email Verified 🎉
                                </h2>
                                <p className="text-gray-700 mt-2">
                                    Your email has been successfully verified. Welcome aboard!
                                </p>
                                <p className="text-blue-500 mt-2">
                                    Redirecting to login....
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold text-red-600 animate-bounce">
                                    Email Not Verified
                                </h2>
                                <p className="text-red-500 mt-2">
                                    Your email has been not verified. Retry Again!
                                </p>

                                <button className="mt-4 bg-red-600 text-white py-1 px-8 rounded-full text-lg shadow-md hover:bg-red-700 transition duration-300"
                                    onClick={() => window.location.reload()}>
                                    Retry
                                </button>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};

export default VerifyEmail;




// const VerifyEmail = () => {
//

//     useEffect(() => {
//         setTimeout(() => setShow(true), 200); // Smooth entry animation

//         const verifyEmail = async () => {
//             try {
//                 const response = await axiosInstance.post(verifyEmailUrl, { code });
//
//             } catch (error) {
//             }
//         };

//         verifyEmail();
//     }, []);

//     // Redirect to login after 2 seconds if already verified or newly verified
//     useEffect(() => {
//         if (verified || alreadyVerified) {
//             // setTimeout(() => navigate("/login", { replace: true }), 2000);
//         }
//     }, [verified, alreadyVerified, navigate]);

//     return (
//         <div className="flex justify-center items-center bg-gray-100">
//             {verified && <Confetti width={width} height={height} />}
//             <div className={`bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-500 transform ${show ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
//                 {
//
//                 }
//             </div >
//         </div >
//     );
// };

// export default VerifyEmail;
