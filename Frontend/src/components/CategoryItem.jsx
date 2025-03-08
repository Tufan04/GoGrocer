import React, { useState } from 'react'
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import EditCategoryItem from "./EditCategoryItem";
import axiosInstance from "../config/AxiosInstance";
import { deleteCategoryUrl } from "../config/ApiUrl";
import { errorToast } from "../utils/ToastHandler";
import ConfirmBox from "./ConfirmBox";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/productSlice";

function CategoryItem({ item }) {
    const [openEdit, setOpenEdit] = useState(false)
    const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false)
    const [categoryItemData, setCategoryItemData] = useState({
        id: "",
        name: "",
        image: ""
    })
    const [deleteCategory, setDeleteCategory] = useState({
        id: ""
    })

    const categories = useSelector(state => state.product.categories)
    const dispatch = useDispatch()

    const deleteCategoryHandler = async () => {
        try {
            const response = await axiosInstance.delete(
                deleteCategoryUrl, {
                data: {
                    id: deleteCategory.id
                }
            })
            if (!response) {
                toast.error(response.data.message)
            }
            if (response.data.success) {
                dispatch(setCategories(categories.filter(category => category._id !== deleteCategory.id)))
                toast.success(response.data.message)
                setOpenDeleteConfirmBox(false)
            }
        } catch (error) {
            errorToast(error)
        }
    }

    return (
        <div>
            <div className="min-w-32 max-w-36 lg:min-w-36 lg:max-w-40 rounded-xl overflow-hidden shadow-lg p-4 flex flex-col justify-center items-end">
                {/* category image  */}
                <img className="w-full object-fill"
                    src={item.image}
                    alt={item.name}
                />
                {/* edit and delete button  */}
                <div className="w-full flex justify-between items-center ">
                    <button onClick={() => {
                        setOpenEdit(true)
                        setCategoryItemData(item)
                    }}
                        className="bg-green-200 text-green-700 flex justify-center items-center font-semibold gap-1 px-2 py-1 rounded-lg text-sm">
                        {/* <FiEdit/> */}
                        Edit
                    </button>
                    <button onClick={() => {
                        setOpenDeleteConfirmBox(true)
                        setDeleteCategory({ id: item._id })
                    }}
                        className="bg-red-200 text-red-700 flex justify-center items-center font-semibold gap-1 px-2 py-1 rounded-lg text-sm">
                        {/* <RiDeleteBin6Fill/> */}
                        Delete
                    </button>
                </div>
            </div>
            {
                openEdit &&
                <EditCategoryItem
                    categoryItemData={categoryItemData}
                    close={() => setOpenEdit(false)} />
            }
            {
                openDeleteConfirmBox &&
                <ConfirmBox
                    cancel={() => setOpenDeleteConfirmBox(false)}
                    confirm={deleteCategoryHandler}
                />
            }
        </div>
    )
}

export default CategoryItem