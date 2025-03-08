import React, { useEffect, useState } from 'react'
import AddCategory from "../components/AddCategory"
import NoData from "../components/NoData"
import CategoryItem from "../components/CategoryItem"
import { useSelector } from "react-redux"


function Category() {
    const [openAddCategory, setOpenAddCategory] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const categories = useSelector(state => state.product.categories)
    
    useEffect(() => {
        setCategoryData(() => {
            return [
                ...categories
            ]
        })
    }, [categories])

    return (
        <div>
            <div className="w-full bg-gray-100 rounded-xl px-4 py-2 flex items-center justify-between">
                <h4 className="text-xl font-semibold tracking-wide">Category</h4>
                <button className="bg-black text-white py-2 px-4 rounded-xl text-sm font-semibold tracking-wide"
                    onClick={() => setOpenAddCategory(true)}>
                    Add Category
                </button>
            </div>
            {/* add category dialog box */}
            {
                openAddCategory && (
                    <AddCategory
                        close={() => setOpenAddCategory(false)} />
                )
            }
            {/* main content part  */}
            <div className="w-full h-full flex justify-center items-center mt-8">
                {/* no data available section  */}
                {
                    !categoryData[0] && (
                        <NoData />
                    )
                }
                {/* category section  */}
                {
                    categoryData[0] && (
                        <div className="w-full flex flex-wrap justify-center gap-4 ">
                            {
                                categoryData.map((item, index) => (
                                    <CategoryItem key={item.name + index}
                                        item={item} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Category