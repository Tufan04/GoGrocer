import React, { useEffect, useState } from 'react'
import NoData from '../components/NoData'
import { IoSearch } from "react-icons/io5";
import { errorToast } from '../utils/ToastHandler'
import axiosInstance from '../config/AxiosInstance'
import { getProductUrl } from "../config/ApiUrl";
import ProductItem from "../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { setPage, searchProducts } from "../redux/productSlice";

function ProductAdmin() {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const { currentPageProducts, currentPage, totalPages } = useSelector(state => state.product)

  useEffect(() => {
    const delaySearchUpdate = setTimeout(() => {
      if (search.trim() === "") {
        dispatch(setPage(1))
        dispatch(searchProducts(search))
      } else {
        dispatch(setPage(1))
        dispatch(searchProducts(search))
      }
    }, 1000);
    return () => clearTimeout(delaySearchUpdate);
  }, [search])

  const prevHandler = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1))
    }
  }

  const nextHandler = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1))
    }
  }

  return (
    <div >
      {/* upper part  */}
      <div className="w-full bg-gray-100 rounded-xl px-4 py-2 flex items-center justify-between">
        <h4 className="text-xl font-semibold tracking-wide">Products</h4>
        <div className="rounded-lg bg-blue-100 flex gap-2 px-3 py-1 cursor-pointer">
          <IoSearch size={24} />
          <input className="w-full bg-transparent outline-none cursor-pointer"
            type="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* main content  */}
      {
        currentPageProducts?.length > 0 ? (
          <div className="w-full flex flex-wrap justify-center gap-4 ">
            {
              currentPageProducts?.map((item, index) => (
                <ProductItem key={item.name + index}
                  item={item} />
              ))
            }
          </div>
        ) : (
          <NoData />
        )
      }

      {/* pagination */}
      <div className="mt-6 w-full flex justify-center items-center gap-6">
        <button className="bg-black text-white font-semibold tracking-wide px-4 py-2 rounded-md"
          onClick={prevHandler}>
          Previous
        </button>
        <p className="font-semibold text-lg">{currentPage} of {totalPages}</p>
        <button className="bg-black text-white font-semibold tracking-wide px-4 py-2 rounded-md"
          onClick={nextHandler}>
          Next
        </button>
      </div>
    </div >
  )
}

export default ProductAdmin