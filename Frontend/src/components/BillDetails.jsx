import React, { useEffect, useState } from 'react'
import { calculateTotalDiscountPrice, calculateTotalPrice } from "../utils/calculateAmount";
import { FaReceipt } from "react-icons/fa";
import { GiScooter } from "react-icons/gi";
import { FaShoppingBag } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import CountUp from "react-countup";


function BillDetails() {
    const cartProducts = useSelector((state) => state.cart.cartProducts);
    const totalWithoutDiscount = calculateTotalPrice(cartProducts);
    const totalWithDiscount = calculateTotalDiscountPrice(cartProducts);
    const saved = totalWithoutDiscount - totalWithDiscount;
    const minimumAmount = 199;
    const addMoreToGetFreeDelivery = minimumAmount - totalWithDiscount
    const deliveryCharges = totalWithDiscount >= minimumAmount ? 0 : 25
    const allTotalAmount = Number(totalWithDiscount + deliveryCharges + 4)

    const [prevTotalWithoutDiscount, setPrevTotalWithoutDiscount] = useState(0)
    const [prevTotalWithDiscount, setPrevTotalWithDiscount] = useState(0)
    const [prevSaved, setPrevSaved] = useState(0)
    const [prevAlltotalAmount, setPrevAllTotalSavedAmount] = useState(0)
    const [prevAddMoreToGetFreeDelivery, setPrevAddMoreToGetFreeDelivery] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setPrevTotalWithoutDiscount(totalWithoutDiscount)
            setPrevTotalWithDiscount(totalWithDiscount)
            setPrevSaved(saved)
            setPrevAddMoreToGetFreeDelivery(addMoreToGetFreeDelivery)
            setPrevAllTotalSavedAmount(allTotalAmount)
        }, 1000);
    }, [totalWithoutDiscount, totalWithDiscount, saved, allTotalAmount])
    return (
        <div>
            <div className="rounded-xl bg-white flex flex-col gap-1">
                <p className="px-4 pt-4 font-semibold text-md mb-2">
                    Bill details
                </p>
                <div className="px-4 flex flex-col gap-1 mb-3">
                    {/* item total amount  */}
                    <div className="flex justify-between text-sm">
                        <div className="flex gap-2 items-center">
                            <FaReceipt />
                            <p>Items total</p>
                            {saved >
                                0 && (
                                    <p className=" text-[12px] px-2 bg-blue-100 font-semibold text-blue-600 rounded-md">
                                        saved ₹
                                        <CountUp start={prevSaved} end={saved} duration={0.5} />
                                    </p>
                                )}
                        </div>
                        <div className="flex gap-1 items-center">
                            {saved >
                                0 && (
                                    <p className="line-through">
                                        ₹<CountUp start={prevTotalWithoutDiscount} end={totalWithoutDiscount} duration={0.5} />
                                    </p>
                                )}
                            <p>₹<CountUp start={prevTotalWithDiscount} end={totalWithDiscount} duration={0.5} /></p>
                        </div>
                    </div>
                    {/* delivery charge  */}
                    <div className="flex justify-between text-sm">
                        <div className="flex gap-2 items-center">
                            <GiScooter />
                            <p>Delivery charge</p>
                            <BsInfoCircle />
                        </div>
                        <div>
                            {
                                deliveryCharges === 0 ? (
                                    <div className="flex items-center gap-2">
                                        <p className="line-through decoration-0">₹25</p>
                                        <p className="text-green-700">Free</p>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <p className="line-through decoration-0">Free</p>
                                        <p>₹25</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {/* handling charge  */}
                    <div className="flex justify-between text-sm">
                        <div className="flex gap-2 items-center">
                            <FaShoppingBag />
                            <p>Delivery charge</p>
                            <BsInfoCircle />
                        </div>
                        <div>
                            <p>₹4</p>
                        </div>
                    </div>
                    {/* grand total amount  */}
                    <div className="flex justify-between text-sm font-semibold my-2">
                        <p>Grand total</p>
                        <p>
                            ₹<CountUp start={prevAlltotalAmount} end={allTotalAmount} duration={0.5} />
                        </p>
                    </div>
                </div>
                {/* savings part  */}
                <div className="rounded-b-xl bg-blue-100">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="336"
                        height="5"
                        viewBox="0 0 336 5"
                        fill="none"
                    >
                        <path
                            d="M10.5 2.85705C7 -0.000225067 3.5 -0.000225067 0 2.85705V0H336V2.85705C332.5 5.71432 329 5.71432 325.5 2.85705C322 -0.000225067 318.5 -0.000225067 315 2.85705C311.5 5.71432 308 5.71432 304.5 2.85705C301 -0.000225067 297.5 -0.000225067 294 2.85705C290.5 5.71432 287 5.71432 283.5 2.85705C280 -0.000225067 276.5 -0.000225067 273 2.85705C269.5 5.71432 266 5.71432 262.5 2.85705C259 -0.000225067 255.5 -0.000225067 252 2.85705C248.5 5.71432 245 5.71432 241.5 2.85705C238 -0.000225067 234.5 -0.000225067 231 2.85705C227.5 5.71432 224 5.71432 220.5 2.85705C217 -0.000225067 213.5 -0.000225067 210 2.85705C206.5 5.71432 203 5.71432 199.5 2.85705C196 -0.000225067 192.5 -0.000225067 189 2.85705C185.5 5.71432 182 5.71432 178.5 2.85705C175 -0.000225067 171.5 -0.000225067 168 2.85705C164.5 5.71432 161 5.71432 157.5 2.85705C154 -0.000225067 150.5 -0.000225067 147 2.85705C143.5 5.71432 140 5.71432 136.5 2.85705C133 -0.000225067 129.5 -0.000225067 126 2.85705C122.5 5.71432 119 5.71432 115.5 2.85705C112 -0.000225067 108.5 -0.000225067 105 2.85705C101.5 5.71432 98 5.71432 94.5 2.85705C91 -0.000225067 87.5 -0.000225067 84 2.85705C80.5 5.71432 77 5.71432 73.5 2.85705C70 -0.000225067 66.5 -0.000225067 63 2.85705C59.5 5.71432 56 5.71432 52.5 2.85705C49 -0.000225067 45.5 -0.000225067 42 2.85705C38.5 5.71432 35 5.71432 31.5 2.85705C28 -0.000225067 24.5 -0.000225067 21 2.85705C17.5 5.71432 14 5.71432 10.5 2.85705Z"
                            fill="white"
                        />
                    </svg>
                    <div className="flex flex-col justify-between gap-2 text-sm font-semibold px-4 py-3 text-blue-600">
                        {saved >
                            0 && (
                                <div className="flex justify-between items-center">
                                    <p>Your total savings</p>
                                    <p>
                                        ₹
                                        <CountUp start={prevSaved} end={saved} duration={0.5} />
                                    </p>
                                </div>
                            )}
                        {totalWithDiscount <
                            minimumAmount && (
                                <p className="text-xs">
                                    Shop for ₹<CountUp start={prevAddMoreToGetFreeDelivery} end={addMoreToGetFreeDelivery} duration={0.5} /> more to save ₹25 on delivery charge
                                </p>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillDetails