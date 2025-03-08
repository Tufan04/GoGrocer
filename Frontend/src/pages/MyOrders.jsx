import React, { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { FaCity, FaMapMarkerAlt } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { errorToast } from "../utils/ToastHandler";
import axiosInstance from "../config/AxiosInstance";
import { cancelOrderUrl } from "../config/ApiUrl";
import { setOrders } from "../redux/orderSlice";
import toast from "react-hot-toast";

const MyOrders = () => {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.orders.orders);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axiosInstance.put(cancelOrderUrl, { orderId: orderId });
      if (response.data.success) {
        dispatch(setOrders(orders.map(order => order._id === orderId ? response.data.data : order)))
        toast.success(response.data.message);
      }
    } catch (error) {
      errorToast(error);
    }
  }
  return (
    <div>
      {/* top part my orders part  */}
      <div className="w-full bg-gray-100 rounded-xl px-4 py-2 flex items-center justify-between">
        <h4 className="text-xl font-semibold tracking-wide">My Orders</h4>
      </div>
      {/* orders part  */}
      <div className="w-full h-full flex justify-center items-center mt-4 mb-6">
        {
          orders[0] ? (
            <div className="w-full">
              {
                orders?.map((order, index) => (
                  <div key={order?._id || index}
                    className="w-full bg-white shadow-md rounded-lg px-6 py-6 border border-gray-200 mb-4"
                  >
                    {/* orderid and delivery status part  */}
                    <div className="flex flex-wrap justify-end sm:justify-between items-center gap-2 border-b pb-4 mb-2">
                      <h3 className="text-sm md:text-base lg:text-lg font-semibold text-gray-700 line-clamp-2">
                        Order ID: {order?._id}
                      </h3>
                      <span className={`text-sm px-3 py-1 rounded-full font-semibold 
                      ${order?.delivery_status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order?.delivery_status === "Processing"
                            ? "bg-yellow-100 text-yellow-600"
                            : order?.delivery_status === "Shipped"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order?.delivery_status}
                      </span>
                    </div>
                    {/* order details part  */}
                    <div className="text-gray-600 font-semibold flex flex-col gap-1 border-b pb-4">
                      <p className={`text-sm ${order?.payment_mode === "Cash On Delivery" ? "text-red-600" : "text-green-600"}`}>{order?.payment_mode}</p>
                      <p className="text-sm">Total Amount: ₹{order?.totalAmount}</p>
                      <p className="text-sm">Ordered on: {new Date(order?.createdAt).toLocaleDateString()}</p>
                      <div className="text-sm flex gap-2 flex-wrap">
                        <p>Delivery Address: </p>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-blue-700" />
                          <p>{order?.delivery_address.address_line}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCity className="text-blue-700" />
                          <p>{order?.delivery_address.city}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <BiCurrentLocation className="text-blue-700" />
                          <p>{order?.delivery_address.pincode}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <LuPhoneCall className="text-blue-700" />
                          <p>{order?.delivery_address.mobile}</p>
                        </div>
                      </div>
                    </div>
                    {/* products part  */}
                    <div className="w-full mt-3">
                      <h4 className="font-medium text-gray-700">Products:</h4>
                      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between flex-wrap">
                        {
                          order?.product_details.map((product, idx) => (
                            <div key={idx}
                              className="w-full lg:w-[49%] flex items-center gap-3 p-3 rounded-lg shadow-sm hover:bg-blue-50 transition-all duration-300 "
                            >
                              {/* Product Image (Small) */}
                              <div className="w-14 h-14 flex-shrink-0">
                                <img
                                  src={product?.image[0]}
                                  alt={product?.name}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              </div>

                              {/* Product Details */}
                              <div className="w-full flex flex-col">
                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 lg:line-clamp-1">{product?.name}</h3>
                                <p className="text-xs text-gray-500">{product?.unit}</p>

                                {/* Price & CTA */}
                                <div className="w-full mt-1 flex items-center justify-between">
                                  <span className="text-sm font-bold text-blue-600">₹{product?.price}</span>
                                  <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-all"
                                    onClick={() => setSelectedProduct(product)}>
                                    View
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    {/* cancel button */}
                    {
                      order?.delivery_status === "Processing" && (
                        <div className="w-full flex justify-end mt-6">
                          <button className="px-3 py-2 font-semibold bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-all"
                            onClick={() => handleCancelOrder(order?._id)}>
                            Cancel Order
                          </button>
                        </div>
                      )
                    }
                  </div>
                ))
              }
            </div>

          ) : (
            <div className="text-center text-gray-500 text-lg">No orders found.</div>
          )
        }
      </div>

      {/* if view is clicked  */}
      {/* Product Modal */}
      {
        selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedProduct(null)}
              >
                ✖
              </button>

              {/* Product Image */}
              <img
                src={selectedProduct.image[0]}
                alt={selectedProduct.name}
                className="w-full h-48 object-scale-down rounded-md"
              />

              {/* Product Info */}
              <h2 className="text-lg font-bold mt-3">{selectedProduct.name}</h2>
              <p className="text-gray-500 text-sm">{selectedProduct.unit}</p>
              <p className="text-gray-700 mt-2">{selectedProduct.description || "No description available."}</p>

              {/* Price & Close Button */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-blue-600">₹{selectedProduct.price}</span>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default MyOrders;
