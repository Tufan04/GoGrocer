import React, { useState } from 'react'
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { getCartUrl, loginUrl } from "../config/ApiUrl";
import { errorToast } from "../utils/ToastHandler.js";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../config/AxiosInstance";
import { useDispatch } from "react-redux";
import fetchUserDetails from "../utils/fetchUserDetails.js";
import { setUserDetails } from "../redux/userSlice";
import { setCartProducts } from "../redux/cartSlice";


function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(true)
    const togglePassword = () => {
        setShowPassword((pre) => !pre)
    }

    const changeHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    //fetch cart products
    // const fetchCartProducts = async () => {
    //     const response = await axiosInstance.get(getCartUrl)
    //     if (response?.data.success) {
    //         dispatch(setCartProducts(response?.data.data))
    //     }
    //     return
    // }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post(loginUrl, data)
            // if success become false 
            if (!response.data.success) {
                toast.error(response.data.message)
            }
            // if success become true 
            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem("accessToken", response.data.data.accessToken)
                localStorage.setItem("refreshToken", response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))
                // fetchCartProducts()
                setData({
                    email: "",
                    password: ""
                })
                navigate("/", { replace: true })
            }
        } catch (error) {
            errorToast(error)
        }
    }

    return (
        <div className="w-full container text-white mt-4 p-4">
            <div className="w-full mx-auto max-w-lg px-8 py-5 rounded-xl"
                style={{
                    background: "linear-gradient(135deg, rgba(2, 0, 36, 1) 0%, rgba(9, 11, 121, 1) 33%, rgba(0, 138, 255, 1) 100%)"
                }}>
                <p className="w-full font-semibold text-2xl text-center">Welcome to GoGrocer</p>
                <form onSubmit={submitHandler}>
                    {/* Email  */}
                    <div className="mb-2">
                        <label className="text-lg font-semibold"
                            htmlFor="email">Email :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-100 text-black mt-2"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={data.email}
                            onChange={changeHandler}
                            autoFocus={true}
                        />
                    </div>
                    {/* Password  */}
                    <div className="mb-3 relative">
                        <label className="text-lg font-semibold"
                            htmlFor="password">Password :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-100 text-black mt-2"
                            type={showPassword ? "password" : "text"}
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={changeHandler}
                        />
                        <div className="text-black absolute right-3 top-[60%] text-lg cursor-pointer">
                            {
                                !showPassword ?
                                    <FaEye onClick={togglePassword} /> :
                                    <FaEyeSlash onClick={togglePassword} />
                            }
                        </div>
                    </div>
                    <Link to={"/forget-password"} className="block text-right pr-1 hover:text-neutral-200">
                        Forget password ?
                    </Link>
                    <button className="w-full bg-black text-white py-3 my-3 rounded-xl font-semibold text-lg tracking-wide">
                        Login
                    </button>
                </form>
                <p className="text-center mb-2 text-neutral-200">
                    Don't have account ?
                    <Link to={"/register"}
                        className="text-black font-semibold pl-2">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage