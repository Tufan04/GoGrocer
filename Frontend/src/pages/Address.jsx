import React, { useState } from 'react'
import NoData from "../components/NoData"
import { useSelector } from "react-redux"
import AddressItem from "../components/AddressItem"
import AddAddress from "../components/AddAddress"

function Address() {
  const [openAddAddress, setOpenAddAddress] = useState(false)
  const addresses = useSelector(state => state.address.addresses)

  return (
    <div>
      <div className="w-full bg-gray-100 rounded-xl px-4 py-2 flex items-center justify-between">
        <h4 className="text-xl font-semibold tracking-wide">Saved Address</h4>
        <button className="bg-black text-white py-2 px-4 rounded-xl text-sm font-semibold tracking-wide"
          onClick={() => setOpenAddAddress(true)}>
          Add Address
        </button>
      </div>
      {/* address section part  */}
      <div className="w-full h-full flex justify-center items-center mt-4">
        {
          addresses[0] ? (
            <div className="w-full flex flex-wrap justify-center gap-4 ">
              {
                addresses?.map((item, index) => (
                  <AddressItem key={"address" + index}
                    item={item} />
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
  )
}

export default Address