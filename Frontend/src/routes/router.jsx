import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import SearchPage from "../pages/SearchPage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import ForgetPassword from "../pages/ForgetPassword"
import VerifyOTP from "../pages/VerifyOTP"
import ResetPassword from "../pages/ResetPassword"
import Dashboard from "../layouts/Dashboard"
import Profile from "../pages/Profile"
import MyOrders from "../pages/MyOrders"
import Address from "../pages/Address"
import Category from "../pages/Category"
import SubCategory from "../pages/SubCategory"
import UploadProduct from "../pages/UploadProduct"
import ProductAdmin from "../pages/ProductAdmin"
import AdminProtected from "../layouts/AdminProtected"
import ProductListPage from "../pages/ProductListPage"
import ProductDisplayPage from "../pages/ProductDisplayPage"
import CartProductDisplay from "../components/CartProductDisplay"
import CheckoutPage from "../pages/CheckoutPage"
import VerifyEmail from "../pages/VerifyEmail"
import UserProtected from "../layouts/UserProtected"
import NotFoundPage from "../pages/NotFoundPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "forget-password",
                element: <ForgetPassword />
            },
            {
                path: "verify-otp",
                element: <VerifyOTP />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "verify-email/:code",
                element: <VerifyEmail />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <UserProtected>
                            <Profile />
                        </UserProtected>
                    },
                    {
                        path: "myorders",
                        element: <UserProtected>
                            <MyOrders />
                        </UserProtected>
                    },
                    {
                        path: "address",
                        element: <UserProtected>
                            <Address />
                        </UserProtected>
                    },
                    {
                        path: "category",
                        element: <AdminProtected>
                            <Category />
                        </AdminProtected>
                    },
                    {
                        path: "sub-category",
                        element: <AdminProtected>
                            <SubCategory />
                        </AdminProtected>
                    },
                    {
                        path: "upload-product",
                        element: <AdminProtected>
                            <UploadProduct />
                        </AdminProtected>
                    },
                    {
                        path: "product",
                        element: <AdminProtected>
                            <ProductAdmin />
                        </AdminProtected>
                    }
                ]
            },
            {
                path: "category/:category",
                element: <ProductListPage />
            },
            {
                path: "product/:name",
                element: <ProductDisplayPage />
            },
            {
                path: "cart",
                element: <UserProtected>
                    <CartProductDisplay />
                </UserProtected>
            },
            {
                path: "checkout",
                element: <UserProtected>
                    <CheckoutPage />
                </UserProtected>
            }, {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    }
])

export default router