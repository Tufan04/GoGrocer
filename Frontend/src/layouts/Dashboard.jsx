import React from 'react'
import UserMenu from "../components/UserMenu"
import { Outlet } from "react-router-dom"

function Dashboard() {
    return (
        <div>
            <div className="w-full h-full grid lg:grid-cols-[250px,1fr]">
                {/* left part menu  */}
                <div className="h-[calc(100vh-5rem)] sticky top-20 bg-gray-100 p-6 hidden lg:block">
                    <UserMenu />
                </div>
                {/* right part content  */}
                <div className="overflow-y-auto lg:px-12 p-8 bg-white scrollbar-none">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard