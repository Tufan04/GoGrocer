import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { AiOutlineClockCircle } from "react-icons/ai"
import { calculateDiscount } from "../utils/calculateAmount"
import AddToCartButton from "../components/AddToCartButton"

function ProductDisplayPage() {
  const product = useParams()
  const formattedProduct = product?.name;
  const scrollRef = useRef(null);

  const products = useSelector(state => state.product.products)

  const filteredProduct = products.find(product => product.name === formattedProduct)

  const [selectedImage, setSelectedImage] = useState(filteredProduct?.image[0])
  useEffect(() => {
    if (selectedImage === undefined) {
      setSelectedImage(filteredProduct?.image[0])
    }
  }, [filteredProduct])

  return (
    <div className="w-full md:grid md:grid-cols-2">

      {/* Images part */}
      <div className="w-full md:sticky top-20 h-full md:h-[calc(100vh-5rem)] p-4 overflow-auto border-r">
        <div className="w-full flex flex-col justify-center items-center gap-4 p-6 relative">
          <img src={selectedImage} alt=""
            className="w-80 object-cover" />
          <div className={`w-4/5 flex items-center gap-2 scroll-smooth overflow-x-hidden ${filteredProduct?.image?.length < 6 && "justify-center"}`} ref={scrollRef}>
            {
              filteredProduct?.image?.map((image, index) => (
                <img key={index + "image"}
                  src={image} alt=""
                  className={`w-16 object-cover rounded-md cursor-pointer border border-gray-200 ${selectedImage === image ? "border-2 border-blue-300" : ""}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))
            }
          </div>
          {
            filteredProduct?.image?.length > 6 &&
            <div>
              <div className="absolute left-6 top-[85%] translate-y-[-50%] cursor-pointer bg-white rounded-full p-2 shadow-lg text-gray-800 hover:bg-gray-100" onClick={() => scrollRef.current?.scrollBy({ left: -180, behavior: "smooth" })}>
                <IoIosArrowBack />
              </div>
              <div className="absolute right-6 top-[85%] translate-y-[-50%] cursor-pointer bg-white rounded-full p-2 shadow-lg text-gray-800 hover:bg-gray-100" onClick={() => scrollRef.current?.scrollBy({ left: 180, behavior: "smooth" })}>
                <IoIosArrowForward />
              </div>
            </div>
          }
        </div>
      </div>

      {/* Product Details part */}
      <div className="w-full px-8 py-4 flex flex-col justify-start items-start flex-wrap overflow-auto pb-8 bg-blue-50">

        {/* top part  */}
        <div className="w-full flex flex-col gap-2 border-b py-4">
          {
            filteredProduct &&
            <p className="text-xs text-gray-600 font-semibold">Home / {filteredProduct?.subCategory[0]?.name} / {filteredProduct?.name}</p>
          }
          <h3 className="text-2xl font-semibold">{filteredProduct?.name}</h3>
          <div className="flex items-center gap-1 text-[8px] font-semibold bg-neutral-200 w-fit px-2 py-1 tracking-wider rounded-md">
            <AiOutlineClockCircle />
            30 MINS
          </div>
        </div>

        {/* middle part  */}
        <div className="w-full flex justify-between items-start py-4 ">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-gray-600">{filteredProduct?.unit}</p>
            <div className="flex gap-2 text-md">
              {/* discounted price  */}
              {
                filteredProduct?.discount &&
                <div className="font-semibold">
                  ₹
                  {
                    calculateDiscount(filteredProduct?.price, filteredProduct?.discount)
                  }
                </div>
              }
              {/* original price  */}
              <div className="font-semibold">
                <span className={`${filteredProduct?.discount && "text-gray-500"}`}>
                  {filteredProduct?.discount && "MRP"} ₹
                </span>
                <span className={`${filteredProduct?.discount && "text-gray-500 line-through decoration-0"}`}>
                  {filteredProduct?.price}
                </span>
              </div>
              {/* off */}
              {
                filteredProduct?.discount &&
                <div className=" text-xs px-2 py-1 bg-blue-500 font-semibold text-white rounded-md">{filteredProduct?.discount}% OFF</div>
              }
            </div>
            <p className="text-xs">(Inclusive of all taxes)</p>
          </div>
          <div>
            {
              filteredProduct?.stock === 0 ? (
                <p className="text-md font-semibold text-red-400">Out of stock</p>
              ) : (
                <AddToCartButton product={filteredProduct} />
              )
            }
            {/* <button className="bg-green-50 border border-green-600 rounded-md text-sm text-green-600 font-semibold px-3 py-1">ADD TO CART</button> */}
          </div>

        </div>

        {/* bottom part  */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Product Details</h4>

          {/* description */}
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-sm">{filteredProduct?.description}</p>
          </div>
          {/* unit  */}
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-sm">{filteredProduct?.unit}</p>
          </div>

          {
            filteredProduct?.more_details &&
            Object.keys(filteredProduct?.more_details).map((key, index) => (
              <div key={index}>
                <p className="font-semibold">{key}</p>
                <p className="text-sm">{filteredProduct?.more_details[key]}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductDisplayPage