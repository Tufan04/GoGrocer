import React, { useEffect } from 'react'
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { calculateDiscount } from "../utils/calculateAmount";
import { useState } from "react";
import toast from "react-hot-toast";
import { errorToast } from "../utils/ToastHandler";
import axiosInstance from "../config/AxiosInstance";
import { addToCartUrl } from "../config/ApiUrl";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";


function HomeProduct({ product }) {

    return (
        <Link to={`/product/${encodeURIComponent(product.name)}`} className="w-44 h-72  border rounded-xl overflow-hidden shadow-lg flex flex-col justify-center items-center gap-2 p-4 cursor-pointer relative">
            <img className="w-28 h-28 object-scale-down"
                src={product?.image[0]}
                alt={product?.name} />
            <div className="w-full flex flex-col justify-start gap-2 mb-2">
                <div className="flex items-center gap-1 text-[8px] font-semibold bg-neutral-100 w-fit px-1 py-1 tracking-wider rounded-md">
                    <AiOutlineClockCircle />
                    30 MINS
                </div>
                <div className="line-clamp-2 text-sm font-semibold min-h-10">
                    {product?.name}
                </div>
                <div className="text-neutral-500 text-sm">
                    {product?.unit}
                </div>
            </div>
            <div className="w-full flex justify-between items-center mb-2">
                <div className="">
                    <div>
                        {
                            product?.discount &&
                            <div className="text-sm font-semibold">
                                ₹
                                {
                                    calculateDiscount(product?.price, product?.discount)
                                }
                            </div>
                        }
                    </div>
                    <div className={`text-sm font-semibold ${product?.discount && "text-gray-500 line-through decoration-0 font-normal"}`}>
                        ₹{product?.price}
                    </div>
                </div>
                {
                    product?.stock === 0 ? (
                        <p className="text-sm font-semibold text-red-400">Out of stock</p>
                    ) : (
                        <div>
                            <AddToCartButton product={product} />
                        </div>
                    )
                }
            </div>
            {
                product?.discount && (
                    <div className="absolute top-0 left-5">
                        <svg width="30" height="30" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z" fill="#256fef"></path>
                            <text x="50%" y="35%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="9" fontWeight="bold">{product?.discount}%</text>
                            <text x="50%" y="70%" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="9" fontWeight="bold">OFF</text>
                        </svg>
                    </div>

                )
            }
        </Link >
    )
}

export default HomeProduct