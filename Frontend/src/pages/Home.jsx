import React, { useRef } from 'react'
import { useSelector } from "react-redux"
import findProductsByCategory from "../utils/FindProductsByCategory.js"
import HomeProduct from "../components/HomeProduct"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import CartMobile from "../components/CartMobile";


function Home() {
  const categories = useSelector(state => state.product.categories)
  const products = useSelector(state => state.product.products)
  const scrollRef = useRef([]);

  return (
    <div className="w-full px-4 select-none">
      {/* banner */}
      <div className="w-full">
        <div className="w-full mt-2 hidden md:block">
          <img src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg" alt="" />
        </div>
        <p className="font-semibold font-sans tracking-wide text-2xl mt-4 pl-6 md:hidden">Shop by category</p>
      </div>
      {/* category part */}
      <div className="w-full flex flex-wrap justify-center  gap-1 px-3">
        {
          categories?.map((category, index) => (
            <Link key={index + "category"}
              className="w-[75px] md:w-28 h-34 cursor-pointer"
              to={`/category/${category?.name}`}>
              <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
            </Link>
          ))
        }
      </div>
      {/* category wise product part  */}
      <div className="w-full px-3">
        {
          categories.slice(0, 12)?.map((category, index) => (
            <div key={index + "category"} className="my-3 px-5 relative">
              <div className="w-full flex items-center justify-between">
                <h3 className="font-semibold text-2xl">{category.name}</h3>
                <Link className="text-blue-600 cursor-pointer font-semibold hover:text-blue-500"
                  to={`/category/${category?.name}`}>See All</Link>
              </div>
              <div className="flex overflow-x-hidden gap-3 px-2 my-4 scroll-smooth" ref={el => scrollRef.current[index] = el}>
                {
                  findProductsByCategory(category.name, products)?.map((product, index) => (
                    <div key={index + "product"} className="h-80">
                      <HomeProduct product={product} />
                    </div>
                  ))
                }
              </div>
              {/* product scroll handler  */}
              <div>
                <div className="absolute left-0 top-[50%] translate-y-[-50%] cursor-pointer bg-white rounded-full p-2 shadow-lg text-gray-800 hover:bg-gray-100" onClick={() => scrollRef.current[index]?.scrollBy({ left: -180, behavior: "smooth" })}>
                  <IoIosArrowBack />
                </div>
                <div className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer bg-white rounded-full p-2 shadow-lg text-gray-800 hover:bg-gray-100" onClick={() => scrollRef.current[index]?.scrollBy({ left: 180, behavior: "smooth" })}>
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          ))
        }
      </div>

      {/* if product is added into cart then show  */}
      <CartMobile />

    </div>
  )
}

export default Home