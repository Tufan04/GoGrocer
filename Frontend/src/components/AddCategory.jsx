import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io"
import uploadImage from "../utils/uploadImage.js"
import toast from "react-hot-toast"
import axiosInstance from "../config/AxiosInstance.js"
import { addCategoryUrl } from "../config/ApiUrl.js"
import { errorToast } from "../utils/ToastHandler.js"
import { useDispatch, useSelector } from "react-redux"
import { setCategories } from "../redux/productSlice.js"

function AddCategory({ close }) {
    const [data, setData] = useState({
        name: "",
        image: ""
    })

    const categories = useSelector(state => state.product.categories)
    const dispatch = useDispatch()

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
            const response = await axiosInstance.post(addCategoryUrl, data)
            if (!response) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                dispatch(setCategories([...categories, response.data.data]))
                toast.success(response.data.message)
                close()
            }

        } catch (error) {
            errorToast(error)
        }
        setLoading(false)
    }

    const uploadImageHandler = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            toast.error("Please select a file")
            return
        }
        setLoading(true)
        const response = await uploadImage(file)
        if (!response) {
            toast.error(response.data.message)
            return
        }
        setData((prev) => {
            return {
                ...prev,
                image: response.data.data.image
            }
        })
        toast.success(response.data.message)
        setLoading(false)
    }

    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 p-4 bg-neutral-800 z-50 bg-opacity-70 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-4 rounded-xl">
                {/* upper part */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-semibold">Category</p>
                    {/* Exit button  */}
                    <button className="text-neutral-700 ml-auto block"
                        onClick={close}>
                        <IoIosCloseCircle size={28} />
                    </button>
                </div>
                {/* upload part */}
                <form onSubmit={handleSubmit}>
                    {/* category name  */}
                    <div className="mb-4">
                        <label className="text-lg font-semibold"
                            htmlFor="categoryName">Name :</label>
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            id="categoryName"
                            name="name"
                            placeholder="Enter category name"
                            value={data.name}
                            onChange={changeHandler}
                            autoFocus={true}
                            autoComplete="off"
                        />
                    </div>
                    {/* category image  */}
                    <div className="flex items-center gap-4">
                        <div className="h-32 w-32 border-2 border-gray-300 flex justify-center items-center">
                            {
                                data.image ? (
                                    <img className="w-full h-full object-cover object-top"
                                        src={data.image}
                                    />
                                ) : (
                                    <p>No Image</p>
                                )
                            }
                        </div>
                        <label htmlFor="categoryImage">
                            <div className={`${data.name ? "bg-lime-600" : "bg-gray-400"} text-white py-2 px-4 rounded-xl text-sm cursor-pointer`}>
                                {
                                    loading ? "Uploading" : "Upload Image"
                                }
                            </div>
                            <input className="hidden"
                                type="file"
                                id="categoryImage"
                                name="image"
                                disabled={!data.name}
                                onChange={uploadImageHandler} />
                        </label>
                    </div>
                    <button className={`w-full mt-4 ${(data.name && data.image) ? "bg-black" : "bg-gray-400"} text-white py-3 px-4 rounded-lg text-sm font-semibold tracking-wide`}
                        disabled={!(data.name && data.image)}>
                        {loading ? "Loading..." : "Add"}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AddCategory