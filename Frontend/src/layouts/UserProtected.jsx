import React from 'react'
import { useSelector } from "react-redux"
import access_denied from "../assets/access_denied.png"

function UserProtected({ children }) {
    const user = useSelector(state => state.user)

    return (
        <>
            {
                user.role === "User" ? children : (
                    <div className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-800 z-50 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg flex flex-col items-center">
                            {/* <h2 className="text-2xl font-semibold mb-4">Access Denied</h2> */}
                            <img src={access_denied} className="h-40" />
                            <p className="text-lg mb-6 font-semibold">You need login to access this page.</p>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => window.location.href = '/login'}
                                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}

export default UserProtected