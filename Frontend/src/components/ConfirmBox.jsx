import React from 'react'

function ConfirmBox({cancel,confirm}) {
    return (
        <div className=" fixed top-0 right-0 bottom-0 left-0 p-4 bg-neutral-800 z-50 bg-opacity-70 flex justify-center items-center">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Are you sure?</h2>
                    <p className="text-gray-600 mb-6">Do you really want to proceed with this action? This action cannot be undone.</p>
                    <div className="flex justify-end gap-4">
                        <button
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            onClick={cancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                            onClick={confirm}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox