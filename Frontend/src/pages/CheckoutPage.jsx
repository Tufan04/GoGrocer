import React, { useEffect, useState } from 'react'
import BillDetails from "../components/BillDetails"
import { useDispatch, useSelector } from "react-redux"
import AddressItem from "../components/AddressItem"
import NoData from "../components/NoData"
import AddAddress from "../components/AddAddress"
import { errorToast } from "../utils/ToastHandler.js"
import axiosInstance from "../config/AxiosInstance"
import { addCODOrderUrl } from "../config/ApiUrl"
import { setCartProducts } from "../redux/cartSlice"
import { setOrders } from "../redux/orderSlice"
import OrderSuccess from "../components/OrderSuccess"
import { useNavigate } from "react-router-dom"

function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const addresses = useSelector(state => state.address.addresses)
  const [selectedAddress, setSelectedAddress] = useState(null)
  const cartProducts = useSelector(state => state.cart.cartProducts)
  let totalAmount = useSelector(state => state.cart.allTotalAmount)
  const orders = useSelector(state => state.orders.orders)
  const [isOrderSuccess, setIsOrderSuccess] = useState(false)
  const product_details = cartProducts.map(product => product.productId);
  useEffect(() => {
    setSelectedAddress(addresses[0])
  }, [addresses])

  if (totalAmount === 0) totalAmount = localStorage.getItem("totalAmount")

  const CODOrderHandler = async () => {
    try {
      const response = await axiosInstance.post(addCODOrderUrl, {
        product_details: product_details,
        delivery_address: selectedAddress,
        totalAmount: totalAmount
      })
      if (response.data.success) {
        dispatch(setCartProducts([]))
        dispatch(setOrders([response.data.data, ...orders]))
        setIsOrderSuccess(true)
      }
    } catch (error) {
      errorToast(error)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-3">
      {/* address part */}
      <div className="w-full ">
        <div className="w-full bg-gray-100 rounded-xl px-4 py-2 flex items-center justify-between">
          <h4 className="text-xl font-semibold tracking-wide">Saved Address</h4>
          <button className="bg-black text-white py-2 px-4 rounded-xl text-sm font-semibold tracking-wide"
            onClick={() => setOpenAddAddress(true)}>
            Add Address
          </button>
        </div>
        {/* address section part  */}
        <div className="w-full flex justify-center items-center mt-8">
          {
            addresses[0] ? (
              <div className="w-full flex flex-wrap justify-center gap-4">
                {
                  addresses?.map((item, index) => (
                    <div key={"address" + index} onClick={() => setSelectedAddress(item)}
                      className="w-full flex items-center gap-1">
                      <div className={`w-2 h-[95%] ${selectedAddress === item ? "bg-green-600" : "bg-gray-300"} rounded-full`}></div>
                      <AddressItem item={item} />
                    </div>
                  ))
                }
              </div>
            ) : (
              <NoData />
            )
          }
        </div>

        {/* add address dialog box */}
        {
          openAddAddress && (
            <AddAddress
              close={() => setOpenAddAddress(false)} />
          )
        }
      </div>
      {/* billing part  */}
      <div className="flex flex-col md:flex-row md:items-end lg:flex-col gap-3">
        <div className="w-full md:max-w-sm shadow-lg rounded-xl lg:mb-3">
          <BillDetails />
        </div>
        {/* online pay part */}
        {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300 shadow-md">
          Pay Now
        </button> */}

        <button onClick={CODOrderHandler}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300 shadow-md">
          Cash on Delivery
        </button>

      </div>

      {/* order success part show  */}
      {
        isOrderSuccess && (
          <OrderSuccess />
        )
      }
    </div>
  )
}

export default CheckoutPage