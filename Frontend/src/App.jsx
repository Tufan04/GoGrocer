import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/fetchUserDetails.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./redux/userSlice";
import { setCategories, setProducts, setSubCategories } from "./redux/productSlice";
import axiosInstance from "./config/AxiosInstance";
import { getAddressUrl, getCartUrl, getCategoryUrl, getOrdersUrl, getProductUrl, getSubCategoryUrl } from "./config/ApiUrl";
import { setCartProducts } from "./redux/cartSlice";
import { setAddresses } from "./redux/addressSlice";
import { setOrders } from "./redux/orderSlice";

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user._id);
  const [loading, setLoading] = useState(true); // State for loading animation

  // Function to simulate fetching process
  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCategories(),
        fetchSubCategories(),
        fetchProducts(),
        user ? fetchUserData() : Promise.resolve()
      ]);
    } finally {
      setLoading(false); // Hide loader after data fetching
    }
  };

  // Fetch user-related data if logged in
  const fetchUserData = async () => {
    await Promise.all([fetchCartProducts(), fetchAddresses(), fetchOrders()]);
  };

  // Fetch user details
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  // Fetch categories
  const fetchCategories = async () => {
    const response = await axiosInstance.get(getCategoryUrl);
    if (response.data.success) {
      dispatch(setCategories(response?.data.data));
    }
  };

  // Fetch subcategories
  const fetchSubCategories = async () => {
    const response = await axiosInstance.get(getSubCategoryUrl);
    if (response.data.success) {
      dispatch(setSubCategories(response?.data.data));
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    const response = await axiosInstance.get(getProductUrl);
    if (response.data.success) {
      dispatch(setProducts(response?.data.data));
    }
  };

  // Fetch cart products
  const fetchCartProducts = async () => {
    const response = await axiosInstance.get(getCartUrl);
    if (response?.data.success) {
      dispatch(setCartProducts(response?.data.data));
    }
  };

  // Fetch addresses
  const fetchAddresses = async () => {
    const response = await axiosInstance.get(getAddressUrl);
    if (response.data.success) {
      dispatch(setAddresses(response?.data?.data));
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    const response = await axiosInstance.get(getOrdersUrl);
    if (response.data.success) {
      dispatch(setOrders(response?.data?.data));
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (accessToken) {
    fetchUser();
  }

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top on route change
  }, [pathname]);

  return (
    <div className="w-full h-full scrollbar-none">
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
          <div className="loading-container">
            <div className="box-loader"></div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <div className="min-h-[calc(100vh-5rem)]">
            <Outlet />
          </div>
          <Footer />
          <Toaster />
        </>
      )}
    </div>
  );
}

export default App;
