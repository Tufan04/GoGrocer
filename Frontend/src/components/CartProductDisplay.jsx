import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import timeImage from "../assets/time.png";
import NoProduct from "../assets/empty_cart.png";
import {
    calculateDiscount,
    calculateTotalDiscountPrice,
    calculateTotalItems,
} from "../utils/calculateAmount";
import { useDispatch, useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowRight } from "react-icons/md";
import CountUp from "react-countup";
import BillDetails from "./BillDetails";
import { setAllTotalAmount } from "../redux/cartSlice";

function CartProductDisplay({ close }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.cartProducts);
    const [deliveryTime, setDeliveryTime] = useState(12);
    const totalWithDiscount = calculateTotalDiscountPrice(cartProducts);
    const minimumAmount = 199;
    const deliveryCharges = totalWithDiscount >= minimumAmount ? 0 : 25;
    const allTotalAmount = Number(totalWithDiscount + deliveryCharges + 4);
    useEffect(() => {
        setDeliveryTime(Math.floor(Math.random() * (20 - 10 + 1)) + 10);
    }, [cartProducts]);

    const [prevAlltotalAmount, setPrevAllTotalAmount] = useState(0);
    useEffect(() => {
        setTimeout(() => {
            setPrevAllTotalAmount(allTotalAmount);
        }, 1000);
    }, [allTotalAmount]);

    const proceedClickHandler = () => {
        dispatch(setAllTotalAmount(allTotalAmount))
        localStorage.setItem("totalAmount", allTotalAmount)
        navigate("/checkout");
        close ? close() : () => navigate(-1);
    };

    // when click any where outside of the cart the cart close
    const cartRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                close && close(); // Close the cart if clicked outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [close]);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50">
            <div ref={cartRef} className="max-w-sm bg-white h-screen ml-auto">
                <div className="w-full bg-gray-100 h-screen overflow-y-scroll">
                    {/* upper part  */}
                    <div className="w-full px-5 py-4 flex justify-between items-center sticky top-0 shadow-sm bg-white">
                        <p className="font-semibold text-lg">My Cart</p>
                        <IoClose
                            size={24}
                            onClick={close ? close : () => navigate(-1)}
                            className="cursor-pointer"
                        />
                    </div>
                    {/* main part  */}
                    <div>
                        {cartProducts[0] ? (
                            <div className="p-4 flex flex-col gap-3">
                                {/* product details part  */}
                                <div className="p-4 rounded-xl bg-white flex flex-col gap-2">
                                    {/* time section  */}
                                    <div className="flex gap-3 h-12">
                                        <img
                                            src={timeImage}
                                            alt=""
                                            className="h-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-md">
                                                Delivery in {deliveryTime} minutes
                                            </p>
                                            <p className="text-sm text-neutral-600">
                                                Shipment of {calculateTotalItems(cartProducts)} items
                                            </p>
                                        </div>
                                    </div>
                                    {/* single product section  */}
                                    <div>
                                        {cartProducts?.map((product, index) => {
                                            return (
                                                <div
                                                    key={index + "cartProduct"}
                                                    className="flex gap-4 justify-between items-center my-4 h-20"
                                                >
                                                    <div className="flex h-full gap-2">
                                                        <img
                                                            src={product?.productId?.image[0]}
                                                            alt=""
                                                            className="w-20 h-20 object-cover border rounded-xl"
                                                        />
                                                        <div className="flex flex-col justify-between gap-1 py-1">
                                                            <p className="text-xs text-neutral-900 line-clamp-2">
                                                                {product?.productId?.name}
                                                            </p>
                                                            <p className="text-xs text-neutral-900">
                                                                {product?.productId?.unit}
                                                            </p>
                                                            <div className="text-xs flex">
                                                                <p className="font-semibold mr-1">
                                                                    ₹{" "}
                                                                    {calculateDiscount(
                                                                        product?.productId?.price,
                                                                        product?.productId?.discount
                                                                    )}
                                                                </p>
                                                                {product?.productId?.discount > 0 && (
                                                                    <p className="line-through">
                                                                        ₹{product?.productId?.price}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <AddToCartButton product={product?.productId} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Bill details part  */}
                                <BillDetails />
                                {/* Cancellation Policy  */}
                                <div className="p-4 rounded-xl bg-white">
                                    <p className="text-md font-semibold">Cancellation Policy</p>
                                    <p className="text-sm text-neutral-600">
                                        Orders cannot be cancelled once packed for delivery. In case
                                        of unexpected delays, a refund will be provided, if
                                        applicable.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full mt-[50%] transition-transform translate-y-[-30%] flex flex-col justify-center items-center gap-2 ">
                                <img src={NoProduct} alt="No product Found" className="w-48" />
                                <p className="font-semibold text-xl mb-2">Your cart is empty</p>
                                <div
                                    onClick={close ? close : () => navigate(-1)}
                                    className="px-4 py-2 bg-green-600 rounded-xl font-semibold text-white cursor-pointer"
                                >
                                    Shop Now
                                </div>
                            </div>
                        )}
                    </div>
                    {/* proceed button  */}
                    {cartProducts[0] && (
                        <div className="sticky bottom-0 bg-white">
                            <div className="w-full py-2 px-4">
                                <div className="bg-green-700 text-white rounded-xl px-4 py-2 flex justify-between items-center font-semibold ">
                                    <div className="flex flex-col items-center">
                                        <p>
                                            ₹{" "}
                                            <CountUp
                                                start={prevAlltotalAmount}
                                                end={allTotalAmount}
                                                duration={0.5}
                                            />
                                        </p>
                                        <p className="text-xs uppercase tracking-wider text-neutral-300">
                                            Total
                                        </p>
                                    </div>
                                    <div
                                        onClick={proceedClickHandler}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <p>Proceed</p>
                                        <MdOutlineArrowRight size={26} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartProductDisplay;
