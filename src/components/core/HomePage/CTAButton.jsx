import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children, active, linkTo}) {
  return (
   <Link to={linkTo}>
    <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-50 text-black" : "bg-richblack-800 text-white"} hover:transition-all scale-95 duration-200`}>
    {children}
    </div>
   </Link>
  )
}

export default CTAButton