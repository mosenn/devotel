import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <nav className=" flex justify-around  items-center bg-blue-600 p-4 rounded-sm text-white mx-5 mt-5">
      <Link href="/" className=" text-lg font-semibold hover:text-gray-300">
        Home
      </Link> 
      <Link href="/forecast" className="text-lg font-semibold hover:text-gray-300">
        7-Day Forecast
      </Link>
    </nav>
  )
}

export default NavBar


