import React, { useEffect, useState } from 'react'
import AddSubCategory from "../components/AddSubCategory"
import NoData from "../components/NoData"
import SubCategoryItem from "../components/SubCategoryItem"
import { useSelector } from "react-redux"


function SubCategory() {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false)
  const [subCategoryData, setSubCategoryData] = useState([])
  const subCategories = useSelector(state => state.product.subCategories)

  useEffect(() => {
    setSubCategoryData(() => {
      return [
        ...subCategories
      ]
    })
  }, [subCategories])

  return (
    <div>
      <div className="w-full bg-gray-100 rounded-xl px-4 py-2 flex items-center justify-between">
        <h4 className="text-base md:text-xl font-semibold tracking-wide">Sub Category</h4>
        <button className="bg-black text-white py-2 px-4 rounded-xl text-sm font-semibold tracking-wide"
          onClick={() => setOpenAddSubCategory(true)}>
          Add Sub Category
        </button>
      </div>
      {/* add category dialog box */}
      {
        openAddSubCategory && (
          <AddSubCategory
            close={() => setOpenAddSubCategory(false)} />
        )
      }
      {/* main content part  */}
      <div className="w-full h-full flex justify-center items-center mt-8">
        {/* no data available section  */}
        {
          !subCategoryData[0] && (
            <NoData />
          )
        }
        {/* category section  */}
        {
          subCategoryData[0] && (
            <div className="w-full flex flex-wrap justify-center gap-4 mt-4">
              {subCategoryData.map((item, index) => (
                <SubCategoryItem key={item.name + index} item={item}/>
              ))}
            </div>
          )
        }
      </div>
    </div >
  )
}

export default SubCategory