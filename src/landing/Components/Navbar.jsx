import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='font-[ropasans] flex justify-between text-[#edededee] px-3 py-3'>
        <p className = "text-3xl"><span>TECH</span><span className = "text-[#13a388]">MEDIC</span></p>
        <div className = "text-md space-x-2 px-1">
            <Link to = "/login"><button className = "hover:bg-[#ededed10] transition-all text-[#ededed] px-3 sm:px-4 py-1 border-2 rounded-md border-[#13a388]">Log In</button></Link>
            <button className = "text-[#ededed] px-3 sm:px-4 py-1 border-2 rounded-md border-[#13a388] hover:bg-[#13a388ea] transition-all bg-[#13a388]">Sign Up</button>
        </div>
    </div>
  )
}
