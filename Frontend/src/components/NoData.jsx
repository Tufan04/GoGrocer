import React from 'react'
import cat from "../assets/cat.jpg"

function NoData() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 font-semibold text-xl">
      <img className="w-40"
        src={cat} />
      <p>No data found</p>
    </div>
  )
}

export default NoData