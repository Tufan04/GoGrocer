import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io"
import toast from "react-hot-toast"
import axiosInstance from "../config/AxiosInstance.js"
import { addAddressUrl, updateAddressUrl } from "../config/ApiUrl.js"
import { errorToast } from "../utils/ToastHandler.js"
import { useDispatch, useSelector } from "react-redux"
import { setAddresses } from "../redux/addressSlice.js"

function EditAddress({ close, address }) {
    const [data, setData] = useState({
        ...address
    })
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.address.addresses)

    const [loading, setLoading] = useState(false)
    const changeHandler = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axiosInstance.put(updateAddressUrl, data)
            if (response.data.success) {
                dispatch(setAddresses(addresses?.map(ads => ads._id === data._id ? response.data.data : ads)))
                toast.success(response.data.message)
                setData({
                    name: "",
                    address_line: "",
                    city: "",
                    pincode: "",
                    mobile: ""
                })
                close()
            }

        } catch (error) {
            console.log(error);
            errorToast(error)
        }
        setLoading(false)
    }


    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 p-4 bg-neutral-800 z-50 bg-opacity-70 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-4 rounded-xl">
                {/* upper part */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-semibold">Address</p>
                    {/* Exit button  */}
                    <button className="text-neutral-700 ml-auto block"
                        onClick={close}>
                        <IoIosCloseCircle size={28} />
                    </button>
                </div>
                {/* upload part */}
                <form onSubmit={handleSubmit}>
                    {/* user's name  */}
                    <div className="mb-1">
                        <label className="text-lg font-semibold"
                            htmlFor="userName">Name :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            id="userName"
                            name="name"
                            placeholder="Enter your name"
                            value={data.name}
                            onChange={changeHandler}
                            autoFocus={true}
                            autoComplete="off"
                        />
                    </div>
                    {/* address_line  */}
                    <div className="mb-1">
                        <label className="text-lg font-semibold"
                            htmlFor="address_line">Address line :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            id="address_line"
                            name="address_line"
                            placeholder="Enter your address"
                            value={data.address_line}
                            onChange={changeHandler}
                            autoComplete="off"
                        />
                    </div>
                    {/* city  */}
                    <div className="mb-1">
                        <label className="text-lg font-semibold"
                            htmlFor="city">City :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Enter city"
                            value={data.city}
                            onChange={changeHandler}
                            autoComplete="off"
                        />
                    </div>
                    {/* pincode */}
                    <div className="mb-1">
                        <label className="text-lg font-semibold"
                            htmlFor="pincode">Pincode :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            id="pincode"
                            name="pincode"
                            placeholder="Enter pincode"
                            value={data.pincode}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,6}$/.test(value)) { // Only numbers, max 6 digits
                                    setData((prev) => ({ ...prev, pincode: value }));
                                }
                            }}
                            maxLength={6}
                            minLength={6}
                            autoComplete="off"
                        />
                    </div>
                    {/* mobile no  */}
                    <div className="mb-1">
                        <label className="text-lg font-semibold"
                            htmlFor="mobile">Mobile no. :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            id="mobile"
                            name="mobile"
                            placeholder="Enter your mobile number"
                            value={data.mobile}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,10}$/.test(value)) { // Only numbers, max 6 digits
                                    setData((prev) => ({ ...prev, mobile: value }));
                                }
                            }}
                            maxLength={10}
                            minLength={10}
                            autoComplete="off"
                        />
                    </div>

                    <button className={`w-full mt-4 ${(data.name && data.address_line && data.city && data.pincode && data.mobile) ? "bg-black" : "bg-gray-400"} text-white py-3 px-4 rounded-lg text-sm font-semibold tracking-wide`}
                        disabled={!(data.name && data.address_line && data.city && data.pincode && data.mobile)}>
                        {loading ? "Loading..." : "Update address"}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default EditAddress