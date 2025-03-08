import React from 'react'
import { IoIosCloseCircle } from "react-icons/io"

function MoreFields({ close, value, onChange, submit }) {
    return (
        <div className="fixed top-0 right-0 bottom-0 left-0 p-4 bg-neutral-800 z-50 bg-opacity-70 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-4 rounded-xl">
                {/* upper part */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-semibold">Add Fields</p>
                    {/* Exit button  */}
                    <div className="text-neutral-700 ml-auto block cursor-pointer"
                        onClick={close}>
                        <IoIosCloseCircle size={28} />
                    </div>
                </div>
                {/* upload part */}
                <div className="flex flex-col justify-center items-center">
                    {/* field name  */}
                    <div className="w-full mb-4">
                        {/* <label className="text-lg font-semibold"
                            htmlFor="fieldName">Field Name :</label> */}
                        <input className="w-full py-2 px-4 text-lg rounded-lg outline-none bg-neutral-200 text-black mt-2"
                            type="text"
                            placeholder="Enter field name"
                            value={value}
                            onChange={onChange}
                            autoFocus={true}
                            autoComplete="off"
                        />
                    </div>

                    <button onClick={submit}
                        className={`w-fit mt-2 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg text-sm font-semibold tracking-wide `}>
                        Add
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MoreFields