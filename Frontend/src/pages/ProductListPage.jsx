import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeProduct from "../components/HomeProduct";

// filters sub category 
function subCategoryList(subCategories, category) {
  return subCategories.filter(subCategory =>
    subCategory?.category[0]?.name === category
  ).sort((a, b) => a.name.localeCompare(b.name))
}

// filters product 
function productList(products, subCategoryName) {
  return products.filter(product =>
    product?.subCategory[0]?.name === subCategoryName
  ).sort((a, b) => a.name.localeCompare(b.name))
}

function ProductListPage() {
  const subCategories = useSelector(state => state.product.subCategories)
  const products = useSelector(state => state.product.products)

  const category = useParams()
  const formattedCategory = category?.category


  const filteredSubCategories = subCategoryList(subCategories, formattedCategory)

  const [subCategoryName, setSubCategoryName] = useState(filteredSubCategories[0]?.name)

  const filteredProducts = productList(products, subCategoryName)

  useEffect(() => {
    if (subCategoryName === undefined) {
      setSubCategoryName(filteredSubCategories[0]?.name)
    }
  }, [filteredSubCategories])
  return (
    <div className="w-full flex">
      {/* sidebar for subcategory */}
      <div className="w-40 md:w-80 bg-gray-100 sticky top-20 h-[calc(100vh-5rem)] p-4 overflow-auto">
        <h3 className="mb-4 font-semibold text-lg text-blue-600 bg-neutral-300 px-3 py-1 rounded">{formattedCategory}</h3>
        {
          filteredSubCategories?.map((subCategory, index) => (
            <div key={index + "subCategory"}
              className={`w-full px-3 py-2 my-1 cursor-pointer rounded-lg text-xs lg:text-base ${subCategory.name === subCategoryName && "bg-gray-200"} hover:bg-gray-200`}
              onClick={() => setSubCategoryName(subCategory.name)}>
              {subCategory.name}
            </div>
          ))
        }
      </div>
      {/* product part */}
      <div className="w-full h-full p-4 flex justify-start items-start flex-wrap">
        {
          filteredProducts?.map((product, index) => (
            <div key={index + "product"}
              className="p-2">
              <HomeProduct product={product} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ProductListPage