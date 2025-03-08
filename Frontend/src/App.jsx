import { Outlet, useLocation } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"
import fetchUserDetails from "./utils/fetchUserDetails.js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from "./redux/userSlice"
import { setCategories, setProducts, setSubCategories } from "./redux/productSlice"
import axiosInstance from "./config/AxiosInstance"
import { getAddressUrl, getCartUrl, getCategoryUrl, getOrdersUrl, getProductUrl, getSubCategoryUrl } from "./config/ApiUrl"
import { setCartProducts } from "./redux/cartSlice"
import { setAddresses } from "./redux/addressSlice"
import { setOrders } from "./redux/orderSlice"

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const dispatch = useDispatch()
  const user = useSelector(state => state.user._id)

  // fetch user details
  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData?.data))
    return
  }
  // fetch categories 
  const fetchCategories = async () => {
    const response = await axiosInstance.get(getCategoryUrl)
    if (response.data.success) {
      dispatch(setCategories(response?.data.data))
    }
    return
  }
  // fetch sub categories 
  const fetchSubCategories = async () => {
    const response = await axiosInstance.get(getSubCategoryUrl)
    if (response.data.success) {
      dispatch(setSubCategories(response?.data.data))
    }
    return
  }
  // fetch product 
  const fetchProducts = async () => {
    const response = await axiosInstance.get(getProductUrl)
    if (response.data.success) {
      dispatch(setProducts(response?.data.data))
    }
    return
  }
  //fetch cart products
  const fetchCartProducts = async () => {
    const response = await axiosInstance.get(getCartUrl)
    if (response?.data.success) {
      dispatch(setCartProducts(response?.data.data))
    }
    return
  }
  // fetch addresses
  const fetchAddresses = async () => {
    const response = await axiosInstance.get(getAddressUrl)
    if (response.data.success) {
      dispatch(setAddresses(response?.data?.data))
    }
    return
  }
  // fetch orders 
  const fetchOrders = async () => {
    const response = await axiosInstance.get(getOrdersUrl)
    if (response.data.success) {
      dispatch(setOrders(response?.data?.data))
    }
    return
  }

  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
    fetchProducts()
    if (user) {
      fetchCartProducts()
      fetchAddresses()
      fetchOrders()
    }
  }, [user])

  if (accessToken) {
    fetchUser()
  }

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on route change
  }, [pathname]);

  return (
    <div className="w-full h-full scrollbar-none">
      <Header />
      <div className="min-h-[calc(100vh-5rem)]">
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
