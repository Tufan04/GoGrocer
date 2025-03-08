import React, { useEffect, useState } from 'react'
import { FaOpencart } from "react-icons/fa"
import { calculateTotalDiscountPrice, calculateTotalItems } from "../utils/calculateAmount.js"
import { useSelector } from "react-redux"
import { MdOutlineArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import CountUp from "react-countup";



function CartMobile() {
    const cartProducts = useSelector((state) => state.cart.cartProducts)
    const totalAmount = calculateTotalDiscountPrice(cartProducts)
    const [previousTotalAmount, setPreviousTotalAmount] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setPreviousTotalAmount(totalAmount)
        }, 1000);
    }, [totalAmount])
    return (
        <div className={`fixed left-0 right-0 bottom-4 mx-3 transition-transform duration-500 ease-out ${cartProducts[0] ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"}`}>
            <div className="bg-green-700 text-white rounded-xl px-4 py-2 flex justify-between font-semibold lg:hidden">
                <div className="flex items-center gap-3">
                    <FaOpencart size={26} />
                    <div>
                        <p>{calculateTotalItems(cartProducts)} items</p>
                        <p>₹ <CountUp start={previousTotalAmount} end={totalAmount} duration={0.5} /></p>
                    </div>
                </div>
                <Link to={"/cart"} className="flex items-center cursor-pointer">
                    <p>View Cart</p>
                    <MdOutlineArrowRight size={26} />
                </Link>
            </div>
        </div>
    )
}

export default CartMobile