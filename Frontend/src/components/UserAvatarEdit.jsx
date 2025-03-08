import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import axiosInstance from "../config/AxiosInstance"
import { uploadAvatarUrl } from "../config/ApiUrl"
import { errorToast } from "../utils/ToastHandler.js"
import toast from "react-hot-toast"
import { updateAvatar } from "../redux/userSlice"
import { IoIosCloseCircle } from "react-icons/io";


function UserAvatarEdit({close}) {
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            toast.error("Please select a file")
            return
        }
        const formData = new FormData()
        formData.append("avatar", file)
        setLoading(true)
        try {
            const response = await axiosInstance.put(uploadAvatarUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            dispatch(updateAvatar(response.data.data.avatar))
            toast.success(response.data.message)
        } catch (error) {
            errorToast(error)
        }
        setLoading(false)
    }

    return (
        <div className="bg-black fixed top-0 right-0 bottom-0 left-0 bg-opacity-60 p-4 z-50 flex justify-center items-center">
            <div className="bg-white max-w-sm w-full rounded-xl px-5 py-6 flex flex-col gap-2 justify-center items-center">
                {/* exit buttom  */}
                <button className="text-neutral-700 ml-auto block"
                onClick={close}>
                    <IoIosCloseCircle size={28}/>
                </button>
                {/* upload image section  */}
                <div className="w-20 h-20 rounded-full bg-white mb-6">
                    {
                        user.avatar ? (
                            <img src={user.avatar}
                                className="w-full h-full object-cover object-center rounded-full" />
                        ) : (
                            <div className="w-full h-full rounded-full text-2xl border-2 font-bold flex justify-center items-center">
                                {user.name[0]}
                            </div>
                        )
                    }
                </div>
                {/* upload form  */}
                <form>
                    <label htmlFor="avatar">
                        <div className="text-sm border border-black py-2 px-6 rounded-xl font-semibold tracking-wide cursor-pointer">
                            {loading ? "Uploading..." : "Upload"}
                        </div>
                    </label>
                    <input className="hidden"
                        type="file"
                        name="avatar"
                        id="avatar"
                        disabled={loading}
                        onChange={handleAvatarUpload} />
                </form>

            </div>
        </div>
    )
}

export default UserAvatarEdit