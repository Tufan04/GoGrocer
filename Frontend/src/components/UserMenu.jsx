import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Divider from "./Divider"
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import axiosInstance from "../config/AxiosInstance";
import { logoutUrl } from "../config/ApiUrl";
import { logout, setUserDetails } from "../redux/userSlice";
import toast from "react-hot-toast";
import { errorToast } from "../utils/ToastHandler"
import { TbExternalLink } from "react-icons/tb";
import { TbCategoryFilled } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { IoMdCloudUpload } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { setCartProducts } from "../redux/cartSlice";


function UserMenu({ close }) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClose = () => {
        if (close) {
            close()
        }
    }

    const logoutHandler = async () => {
        try {
            const response = await axiosInstance.get(logoutUrl)

            if (response.data.success) {
                dispatch(logout())
                dispatch(setUserDetails({}))
                dispatch(setCartProducts([]))
                localStorage.clear()
                handleClose()
                navigate("/login")
                toast.success(response.data.message)
            }
        } catch (error) {
            errorToast(error)
        }
        return
    }
    useEffect(() => {
        if (!user) {
            return null
        }
    }, [user])

    return (
        <div>
            <div className="font-semibold text-lg mb-2">My Account</div>
            <div className="flex items-center gap-4">
                {/* user avatar or name first letter */}
                {
                    user?.avatar ? (
                        <img src={user?.avatar} className="w-12 h-12 rounded-full border-2 border-indigo-500" />
                    ) : (
                        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 text-xl font-bold flex justify-center items-center">{user?.name?.slice(0, 1)}</div>
                    )
                }
                {/* view profile link  */}
                <div>
                    <div className="font-semibold text-md">
                        {user?.name}
                    </div>
                    <div>
                        {
                            user?.role === "User" && (
                                <Link to={"/dashboard/profile"} className="flex items-center gap-1 text-sm text-indigo-500 hover:text-indigo-400"
                                    onClick={handleClose}>
                                    view profile
                                    <TbExternalLink size={15} />
                                </Link>
                            )
                        }
                        <span className="text-red-600 font-semibold text-sm">
                            {
                                user?.role === "Admin" && "(Admin)"
                            }
                        </span>
                    </div>
                </div>
            </div>

            <Divider />
            {/* menu list  */}
            <div className="flex flex-col items-start gap-0">

                {
                    user?.role === "Admin" ? (
                        <div className="w-full">

                            {/* category link  */}
                            <Link to={"/dashboard/category"} className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                                onClick={handleClose}>
                                <TbCategoryFilled size={22} color="#005ce6" />
                                Category
                            </Link>

                            {/* sub category link  */}
                            <Link to={"/dashboard/sub-category"} className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                                onClick={handleClose}>
                                <MdCategory size={22} color="#005ce6" />
                                Sub Category
                            </Link>

                            {/* upload product link  */}
                            <Link to={"/dashboard/upload-product"} className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                                onClick={handleClose}>
                                <IoMdCloudUpload size={22} color="#005ce6" />
                                Upload Product
                            </Link>

                            {/* product link  */}
                            <Link to={"/dashboard/product"} className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                                onClick={handleClose}>
                                <FaBoxOpen size={22} color="#005ce6" />
                                Product
                            </Link>
                        </div>

                    ) : (
                        <div className="w-full">
                            {/* my order link  */}
                            <Link to={"/dashboard/myorders"} className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                                onClick={handleClose}>
                                <FaReceipt size={22} color="#005ce6" />
                                My Orders
                            </Link>

                            {/* save address link  */}
                            <Link to={"/dashboard/address"} className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                                onClick={handleClose}>
                                <FaMapMarkedAlt size={22} color="#005ce6" />
                                Save Address
                            </Link>
                        </div>
                    )
                }


                {/* logout button  */}
                <button className="flex items-center gap-3 w-full py-3 px-3 rounded-xl hover:bg-gray-200"
                    onClick={logoutHandler}>
                    <RiLogoutCircleLine size={22} color="#005ce6" />
                    Logout
                </button>

            </div>
        </div>
    )
}

export default UserMenu
