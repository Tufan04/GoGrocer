import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import EditSubCategoryItem from "./EditSubCategoryItem";
import axiosInstance from "../config/AxiosInstance";
import { deleteSubCategoryUrl } from "../config/ApiUrl";
import { errorToast } from "../utils/ToastHandler.js";
import ConfirmBox from "./ConfirmBox";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setSubCategories } from "../redux/productSlice";

function SubCategoryItem({ item }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)
    const [subCategoryItemData, setSubCategoryItemData] = useState({
        id: "",
        name: "",
        image: "",
        category: []
    })
    const [deleteSubCategory, setDeleteSubCategory] = useState({
        id: ""
    })

    const subCategories = useSelector(state => state.product.subCategories)
    const dispatch = useDispatch()

    const deleteSubCategoryHandler = async () => {
        try {
            const response = await axiosInstance.delete(
                deleteSubCategoryUrl, {
                data: {
                    id: deleteSubCategory.id
                }
            })
            if (!response) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                dispatch(setSubCategories(subCategories.filter(subCategory => subCategory._id !== deleteSubCategory.id)))
                toast.success(response.data.message)
                setOpenDeleteConfirmBox(false)
            }
        } catch (error) {
            errorToast(error)
        }
    }

    return (
        <div>
            <div className="w-64 md:w-80 lg:w-96 h-60 p-6 flex justify-center items-center gap-8 rounded-xl overflow-hidden shadow-lg">
                {/* sub category image  */}
                <div className="w-2/5 lg:w-1/5 h-full flex items-center">
                    <img className="w-full  object-cover"
                        src={item.image} alt={item.name} />
                </div>
                <div className="w-3/5 lg:w-4/5 h-full flex flex-col justify-between items-start">
                    <div>
                        <p className="text-base lg:text-xl font-semibold mb-4">{item.name}</p>
                        <div className="flex flex-wrap items-center gap-3">
                            {
                                item.category.map(cat => (
                                    <div className="w-fit flex items-center bg-blue-100 px-3 py-2 rounded-md" key={cat._id + "cat"}>
                                        <p className="text-blue-800 font-medium text-xs">{cat.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center gap-4">
                        <button onClick={() => {
                            setOpenEdit(true)
                            setSubCategoryItemData(item)
                        }}
                            className="bg-green-200 text-green-700 flex justify-center items-center font-semibold gap-1 px-4 py-2 rounded-lg text-sm">
                            {/* <FiEdit size={18} /> */}
                            Edit
                        </button>
                        <button onClick={() => {
                            setOpenDeleteConfirmBox(true)
                            setDeleteSubCategory({ id: item._id })
                        }}
                            className="bg-red-200 text-red-700 flex justify-center items-center font-semibold gap-1 px-4 py-2 rounded-lg text-sm">
                            {/* <RiDeleteBin6Fill size={18} /> */}
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            {
                openEdit &&
                <EditSubCategoryItem
                    subCategoryItemData={subCategoryItemData}
                    close={() => setOpenEdit(false)} />
            }
            {
                openDeleteConfirmBox &&
                <ConfirmBox
                    cancel={() => setOpenDeleteConfirmBox(false)}
                    confirm={deleteSubCategoryHandler}
                />
            }
        </div >

    )
}

export default SubCategoryItem