import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io"
import uploadImage from "../utils/uploadImage.js"
import toast from "react-hot-toast"
import axiosInstance from "../config/AxiosInstance.js"
import { updateSubCategoryUrl } from "../config/ApiUrl.js"
import { errorToast } from "../utils/ToastHandler.js"
import { useDispatch, useSelector } from "react-redux"
import { setSubCategories } from "../redux/productSlice.js"

function EditSubCategoryItem({ subCategoryItemData, close }) {
  const [data, setData] = useState({
    id: subCategoryItemData._id,
    name: subCategoryItemData.name,
    image: subCategoryItemData.image,
    category: subCategoryItemData.category
  })
  const [loading, setLoading] = useState(false)
  const categories = useSelector(state => state.product.categories)
  const subCategories = useSelector(state => state.product.subCategories)
  const dispatch = useDispatch()


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
      const response = await axiosInstance.put(updateSubCategoryUrl, data)
      if (!response) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        dispatch(setSubCategories(subCategories.map(subCategory => subCategory._id === data.id ? response.data.data : subCategory)))
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
          <p className="text-xl font-semibold">Edit Sub Category</p>
          {/* Exit button  */}
          <button className="text-neutral-700 ml-auto block"
            onClick={close}>
            <IoIosCloseCircle size={28} />
          </button>
        </div>
        {/* upload part */}
        <form onSubmit={handleSubmit}>
          {/* sub category name  */}
          <div className="mb-4">
            <label className="text-lg font-semibold"
              htmlFor="subCategoryName">Name :</label>
            <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
              type="text"
              id="subCategoryName"
              name="name"
              placeholder="Enter sub category name"
              value={data.name}
              onChange={changeHandler}
              autoFocus={true}
            />
          </div>
          
          {/* sub category image  */}
          <div className="flex items-center gap-4">
            <div className="h-32 w-32 border-2 border-gray-300 flex justify-center items-center overflow-hidden">
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
            <label htmlFor="subCategoryImage">
              <div className={`${data.name ? "bg-lime-600" : "bg-gray-400"} text-white py-2 px-4 rounded-xl text-sm cursor-pointer`}>
                {loading ? "Uploading" : "Upload Image"}
              </div>
              <input className="hidden"
                type="file"
                id="subCategoryImage"
                name="image"
                disabled={!data.name}
                onChange={uploadImageHandler} />
            </label>
          </div>

          {/* select category section  */}
          <div className="w-full">
            <label htmlFor="selectCategory" className="font-semibold">Select Category</label>
            {/* display category */}
            <div className="mt-2">
              {/* Selected Options Display */}
              <div className="mb-4 space-y-1 flex flex-wrap items-center gap-2">
                {
                  data?.category?.map((option, index) => (
                    <div className="w-fit flex items-center gap-2 bg-blue-100 px-2 py-2 rounded-md"
                      key={index}
                    >
                      <span className="text-blue-800 font-medium text-sm">{option.name}</span>
                      <div className="text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => {
                          setData((prev) => {
                            return {
                              ...prev,
                              category: [...data.category.filter(cate => cate.name !== option.name)]
                            }
                          })
                        }}>
                        <IoIosCloseCircle size={20} />
                      </div>
                    </div>
                  ))
                }
              </div>

              {/* Select Dropdown */}
              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md outline-none"
                  value=""
                  name="category"
                  onChange={(e) => {
                    const value = e.target.value;
                    const categoryDetails = categories.find(category => category.name === value)
                    const isprevSelected = data.category.find(cat => cat.name === value)
                    if (!isprevSelected) {
                      setData((prev) => {
                        return {
                          ...prev,
                          category: [...data.category, categoryDetails]
                        }
                      })
                    }
                  }}>
                  <option value="" disabled>
                    Select an category
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button className={`w-full mt-4 ${(data.name && data.image && data?.category[0]) ? "bg-black" : "bg-gray-400"} text-white py-3 px-4 rounded-lg text-sm font-semibold tracking-wide`}
            disabled={!(data.name && data.image && data?.category?.length > 0 && setLoading)}>
            {loading ? "Loading..." : "Update"}
          </button>
        </form>
      </div>

    </div>
  )
}

export default EditSubCategoryItem
