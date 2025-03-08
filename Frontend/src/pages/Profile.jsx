import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import UserAvatarEdit from "../components/UserAvatarEdit"
import axiosInstance from "../config/AxiosInstance"
import { updateUserUrl } from "../config/ApiUrl"
import { errorToast } from "../utils/ToastHandler.js"
import toast from "react-hot-toast"
import { setUserDetails } from "../redux/userSlice"

function Profile() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [openAvatarUpload, setOpenAvatarUpload] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    mobile: "",
    oldPassword: "",
    newPassword: "",
  })

  useEffect(() => {
    setUserData({
      name: user?.name || "",
      mobile: user?.mobile || "",
      oldPassword: "",
      newPassword: "",
    })
  }, [user])

  const [loading, setLoading] = useState(false)

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosInstance.put(updateUserUrl, userData)
      if (response.data.success) {
        toast.success(response.data.message)
        dispatch(setUserDetails(response.data.data))
      }
    }
    catch (error) {
      errorToast(error)
    }
    setLoading(false)
    return
  }


  return (
    <div>
      {/* profile image change section  */}
      <div className="flex items-center gap-10">
        {/* profile image */}
        <div className="w-20 h-20 flex justify-center items-center rounded-full bg-white border-2 border-indigo-600">
          {
            user?.avatar ? (
              <img src={user.avatar}
                className="w-full h-full object-cover object-center rounded-full" />
            ) : (
              <div className="rounded-full text-2xl font-bold flex justify-center items-center">
                {user?.name[0]}
              </div>
            )
          }
        </div>
        {/* profile image change */}
        <button className="text-sm border border-black py-2 px-4 rounded-xl font-semibold tracking-wide"
          onClick={() => setOpenAvatarUpload(true)}>
          Change Profile
        </button>
        {
          openAvatarUpload && (
            <UserAvatarEdit close={() => setOpenAvatarUpload(false)} />
          )
        }

      </div>

      {/* name email mobile password change section  */}
      <form onSubmit={submitHandler}>
        <div className="mt-8 w-full flex flex-col gap-3 px-5 lg:px-8 bg-blue-100 py-6 rounded-md">
          {/* name  */}
          <div>
            <label className="text-lg font-semibold"
              htmlFor="name">Name : </label>
            <input className="w-full py-2 px-4 text-lg rounded-lg outline-none text-black mt-2"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={userData.name}
              onChange={onChangeHandler}
              required
            />
          </div>
          {/* email */}
          <div>
            <label className="text-lg font-semibold"
              htmlFor="email">Email : </label>
            <input className="w-full py-2 px-4 text-lg rounded-lg outline-none text-black mt-2"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={user?.email}
              disabled
            />
          </div>
          {/* mobile */}
          <div>
            <label className="text-lg font-semibold"
              htmlFor="mobile">Mobile : </label>
            <input className="w-full py-2 px-4 text-lg rounded-lg outline-none text-black mt-2"
              type="text"
              name="mobile"
              id="mobile"
              placeholder="Enter your mobile"
              value={userData.mobile}
              onChange={onChangeHandler}
            />
          </div>
          {/* old password  */}
          <div>
            <label className="text-lg font-semibold"
              htmlFor="oldPassword">Old Password : </label>
            <input className="w-full py-2 px-4 text-lg rounded-lg outline-none text-black mt-2"
              type="password"
              name="oldPassword"
              id="oldPassword"
              placeholder="Enter your old password"
              value={userData.oldPassword}
              onChange={onChangeHandler}
            />
          </div>
          {/* new password  */}
          <div>
            <label className="text-lg font-semibold"
              htmlFor="newPassword">New Password : </label>
            <input className="w-full py-2 px-4 text-lg rounded-lg outline-none text-black mt-2"
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              value={userData.newPassword}
              onChange={onChangeHandler}
            />
          </div>
          {/* save button */}
          <button className="w-full bg-black hover:bg-neutral-800 text-white py-3 my-3 rounded-xl font-semibold text-lg tracking-wide" disabled={loading}>
            {
              loading ? "Saving..." : "Save"
            }
          </button>
        </div>
      </form>
    </div >
  )
}

export default Profile