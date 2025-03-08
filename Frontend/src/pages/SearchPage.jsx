import React from 'react'
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import HomeProduct from "../components/HomeProduct"
import noProductImage from "../assets/cat.jpg"

function SearchPage() {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const searchQuery = query.get("q")

  const products = useSelector((state) => state.product.products)

  const filteredProducts = products?.filter((product) => {
    return product?.subCategory[0]?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  }).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="w-full px-4 py-6">
      <div className="mb-3">
        {
          filteredProducts?.length > 0 && (
            <p className="text-xl font-semibold px-4 py-2">Showing results for "{searchQuery}"</p>
          )
        }
      </div>
      <div>
        {
          filteredProducts?.length > 0 ? (
            <div className=" flex flex-wrap justify-center items-center gap-2 ">
              {
                filteredProducts?.map((product, index) => (
                  <HomeProduct key={index} product={product} />
                ))
              }
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center gap-4 px-4 py-6">
                <img src={noProductImage} alt="" 
                  className="w-40 mb-4"
              />
              <h1 className="text-2xl font-semibold">No products found</h1>
            </div>

          )
        }
      </div>
    </div>
  )
}

export default SearchPage