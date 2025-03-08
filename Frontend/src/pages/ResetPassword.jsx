import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { resetPasswordUrl } from "../config/ApiUrl";
import { errorToast } from "../utils/ToastHandler";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axiosInstance from "../config/AxiosInstance";


function ResetPassword() {
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: location?.state?.email,
        newPassword: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const togglePassword = () => {
        setShowPassword((pre) => !pre)
    }
    const toggleConfirmPassword = () => {
        setShowConfirmPassword((pre) => !pre)
    }

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forget-password")
        }
    }, [])

    const changeHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        // check password and confirm password is same or not
        if(data.newPassword !== data.confirmPassword){
            toast.error("Password and Confirm Password is not same")
            return
        }
        try {
            const response = await axiosInstance.put(resetPasswordUrl, data)
            // if success become false 
            if (!response.data.success) {
                toast.error(response.data.message)
            }
            // if success become true 
            if (response.data.success) {
                toast.success(response.data.message)
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                })
                navigate("/login")
            }
        } catch (error) {
            errorToast(error)
        }
    }

    return (
        <div className="w-full container text-white mt-4 p-4">
            <div className="w-full mx-auto max-w-lg px-4 lg:px-8 py-5 rounded-xl"
                style={{
                    background: "linear-gradient(135deg, rgba(2, 0, 36, 1) 0%, rgba(9, 11, 121, 1) 33%, rgba(0, 138, 255, 1) 100%)"
                }}>
                <p className="w-full font-semibold text-2xl text-center mb-3">Welcome to GoGrocer</p>
                <form onSubmit={submitHandler}>
                    {/* Password  */}
                    <div className="mb-3 relative">
                        <label className="text-lg font-semibold"
                            htmlFor="newPassword">Password :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-100 text-black mt-2"
                            type={showPassword ? "password" : "text"}
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your password"
                            value={data.newPassword}
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
                    {/* Confirm Password  */}
                    <div className="mb-3 relative">
                        <label className="text-lg font-semibold"
                            htmlFor="confirmPassword">Confirm Password :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-100 text-black mt-2"
                            type={showConfirmPassword ? "password" : "text"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Enter your confirm password"
                            value={data.confirmPassword}
                            onChange={changeHandler}
                        />
                        <div className="text-black absolute right-3 top-[60%] text-lg cursor-pointer">
                            {
                                !showConfirmPassword ?
                                    <FaEye onClick={toggleConfirmPassword} /> :
                                    <FaEyeSlash onClick={toggleConfirmPassword} />
                            }
                        </div>
                    </div>
                    <button className="w-full bg-black text-white py-3 my-3 rounded-xl font-semibold text-lg tracking-wide">
                            Change Password
                    </button>
                </form>
                <p className="text-center mb-2 text-neutral-200">
                    Already have account ?
                    <Link to={"/login"}
                        className="text-black font-semibold pl-2">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default ResetPassword