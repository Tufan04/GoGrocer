import React, { useState } from 'react'
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { BiCurrentLocation } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import EditAddress from "./EditAddress";
import ConfirmBox from "./ConfirmBox";
import axiosInstance from "../config/AxiosInstance";
import { deleteAddressUrl } from "../config/ApiUrl";
import { setAddresses } from "../redux/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import { errorToast } from "../utils/ToastHandler";
import toast from "react-hot-toast";


function AddressItem({ item }) {

    const [openEditAddress, setOpenEditAddress] = useState(false)
    const [openDeleteAddress, setOpenDeleteAddress] = useState(false)
    const dispatch = useDispatch()
    const addresses = useSelector(state => state.address.addresses)

    const deleteAddressHandler = async () => {
        try {
            const response = await axiosInstance.delete(
                deleteAddressUrl, {
                data: {
                    _id: item._id
                }
            }
            )
            if (!response) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                dispatch(setAddresses(addresses.filter(address => address._id !== item._id)))
                toast.success(response?.data?.message)
                setOpenDeleteAddress(false)
            }
        } catch (error) {
            errorToast(error)
        }
    }
    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-4 flex items-end justify-between hover:bg-blue-50 transition-all duration-200">
            {/* Address Details */}
            <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold capitalize">{item?.name}</h4>
                <div className="w-full flex flex-col md:flex-row gap-1 md:gap-3">
                    {/* address_line  */}
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600 text-lg" />
                        <p className="text-gray-600 text-md capitalize">{item?.address_line}</p>
                    </div>
                    {/* city  */}
                    <div className="flex items-center gap-2">
                        <FaCity className="text-blue-600 text-lg" />
                        <p className="text-gray-600 text-md capitalize">{item?.city}</p>
                    </div>
                    {/* pincode  */}
                    <div className="flex items-center gap-2">
                        <BiCurrentLocation className="text-blue-600 text-lg" />
                        <p className="text-gray-600 text-md">{item?.pincode}</p>
                    </div>
                    {/* mobile no  */}
                    <div className="flex items-center gap-2">
                        <LuPhoneCall className="text-blue-600 text-lg" />
                        <p className="text-gray-600 text-md">{item?.mobile}</p>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
                {/* edit button  */}
                <button
                    onClick={() => setOpenEditAddress(true)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                >
                    Edit
                </button>
                {/* delete button  */}
                <button
                    onClick={() => setOpenDeleteAddress(true)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>

            {
                openEditAddress && (
                    <EditAddress close={() => setOpenEditAddress(false)} address={item} />
                )
            }
            {
                openDeleteAddress && (
                    <ConfirmBox cancel={() => setOpenDeleteAddress(false)} confirm={(deleteAddressHandler)} />
                )
            }
        </div>
    )
}

export default AddressItem