import React, { useEffect, useRef, useState } from 'react'
import Search from "./Search"
import logo from "../assets/logo.png"
import logo_mobile from "../assets/logo_mobile.png"
import { CgProfile } from "react-icons/cg";
import { FaOpencart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
import { FaSortDown, FaSortUp } from "react-icons/fa";
import UserMenu from "./UserMenu";
import { calculateDiscount, calculateTotalDiscountPrice, calculateTotalItems } from "../utils/calculateAmount.js";
import CartProductDisplay from "./CartProductDisplay";
import CountUp from "react-countup";


function Header() {
    const user = useSelector((state) => state.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const navigate = useNavigate()
    const cartProducts = useSelector((state) => state.cart.cartProducts)
    const [openCart, setOpenCart] = useState(false)


    // count up down animation 
    const totalAmount = calculateTotalDiscountPrice(cartProducts)
    const [previousTotalAmount, setPreviousTotalAmount] = useState(0)
    useEffect(() => {
        setTimeout(() => {
            setPreviousTotalAmount(totalAmount)
        }, 1000);
    }, [totalAmount])

    // freeze background scroll when cart is open 
    useEffect(() => {
        if (openCart) {
            document.body.style.overflow = "hidden"; // Disable scroll
        } else {
            document.body.style.overflow = "auto"; // Enable scroll back
        }
        return () => {
            document.body.style.overflow = "auto"; // Ensure cleanup
        };
    }, [openCart]);

    return (
        <header className="lg:h-20 w-full shadow-lg sticky top-0 flex flex-col px-3 bg-white z-50">
            <div className="w-full h-full flex justify-between items-center gap-12 px-6">
                {/* logo */}
                <Link to={"/"} className="w-48">
                    <img className="w-full cursor-pointer"
                        src={logo} alt="" />
                </Link>
                {/* search for desktop */}
                <Link to={"/search"} className="w-1/2 hidden lg:block">
                    <Search />
                </Link>
                {/* login and cart */}
                <div className="hidden lg:flex gap-6 items-center">
                    <div>
                        {
                            user._id ? (
                                <div className="relative">
                                    <div className="flex items-center gap-1 cursor-pointer select-none"
                                        onClick={() => setOpenUserMenu(prev => !prev)}>
                                        <p className=" text-lg">Account</p>
                                        {
                                            openUserMenu ? (
                                                <FaSortUp className="text-xl translate-y-[6px]" />
                                            ) : (
                                                <FaSortDown className="text-xl -translate-y-[3px]" />
                                            )
                                        }
                                    </div>
                                    {
                                        openUserMenu && (
                                            <div className="absolute right-0 top-12">
                                                <div className="bg-white rounded-xl p-4 min-w-60 shadow-lg">
                                                    <UserMenu close={() => setOpenUserMenu(false)} />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <Link to={"/login"} className="font-semibold text-lg cursor-pointer">Login</Link>
                            )
                        }
                    </div>
                    {/* Cart  */}
                    <div onClick={() => setOpenCart(true)} className="w-fit flex items-center gap-3 bg-green-700 text-white px-4 py-3 text-lg font-semibold rounded-lg hover:bg-green-600 cursor-pointer">
                        <FaOpencart size={26} />
                        {
                            cartProducts[0] ? (
                                <div className="flex flex-col text-xs">
                                    <p className="tracking-wide">{calculateTotalItems(cartProducts)
                                    } items</p>
                                    <p className="tracking-wide">₹<CountUp start={previousTotalAmount} end={totalAmount} duration={0.5} /></p>
                                </div>
                            ) : (
                                <p className="tracking-wide">Cart</p>
                            )
                        }
                    </div>
                </div>
                {/* profile icon for mobile version  */}
                <div className="lg:hidden text-neutral-600">
                    <div>
                        {
                            user._id ? (
                                <div className="flex items-center gap-1 cursor-pointer select-none"
                                    onClick={() => setOpenUserMenu(prev => !prev)}>
                                    {
                                        user.avatar ? (
                                            <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-indigo-500" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full border-2 border-indigo-500 text-xl font-bold flex justify-center items-center">{user.name[0]}</div>
                                        )
                                    }
                                </div>
                            ) : (
                                <CgProfile size={26}
                                    onClick={() => navigate("/login")} />
                            )
                        }
                    </div>

                    {
                        openUserMenu && (
                            <div className="absolute right-2 top-20">
                                <div className="bg-white rounded-xl p-4 min-w-60 shadow-lg">
                                    <UserMenu close={() => setOpenUserMenu(false)} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {/* search for mobile version  */}
            <Link to={"/search"} className="w-full pb-3 block lg:hidden">
                <Search />
            </Link>

            {/* cart opening */}
            {
                openCart && (
                    <CartProductDisplay close={() => setOpenCart(false
                    )} />
                )
            }
        </header >
    )
}

export default Header