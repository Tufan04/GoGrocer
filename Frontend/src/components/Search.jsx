import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';


function Search() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSearchPage, setIsSerachPage] = useState(false)
  const [searchText, setSearchText] = useState("")
  const query = new URLSearchParams(location.search)

  useEffect(() => {
    const search = location.pathname === "/search"
    setIsSerachPage(search)
    if (location.pathname !== "/search") {
      setSearchText("")
    }
  }, [location])

  function goToBack() {
    navigate(-1)
  }

  useEffect(() => {
    const delaySearchUpdate = setTimeout(() => {
      if (searchText.trim() !== "") {
        query.set("q", searchText)
        navigate(`?${query.toString()}`, { replace: true })
      } else {
        query.delete("q")
        navigate(location.pathname, { replace: true })
      }
    }, 1000);
    return () => clearTimeout(delaySearchUpdate);
  }, [searchText])
  return (
    <div className="w-full h-10 lg:h-12 rounded-xl bg-neutral-200 flex items-center gap-4 px-4 text-gray-500 cursor-pointer">
      {
        !isSearchPage ?
          (<IoSearch size={26} />)
          : (<IoMdArrowRoundBack size={26} onClick={goToBack}
            className="bg-white rounded-full"
          />)
      }
      {
        !isSearchPage ?
          (
            <TypeAnimation className="text-xl"
              sequence={[
                'Search "atta"',
                1000,
                'Search "milk"',
                1000,
                'Search "sugar"',
                1000,
                'Search "curd"',
                1000,
                'Search "bread"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
                'Search "butter"',
                1000,
                'Search "paneer"',
                1000,
                'Search "chocolate"',
                1000,
              ]}
              wrapper="span"
              speed={25}
              repeat={Infinity}
              cursor={false}
            />
          ) :
          (
            <div className="w-full h-full flex items-center">
              <input className="w-full bg-transparent border-none outline-none text-lg"
                type="text"
                placeholder="Search Here"
                autoFocus={true}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          )
      }
    </div>
  )
}

export default Search