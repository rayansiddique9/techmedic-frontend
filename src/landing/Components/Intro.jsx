import React from 'react'

export default function Intro() {
  return (
    <div className = "intro-bg py-10 md:py-12 lg:py-20 px-1 xl:py-28 flex flex-col justify-center">
        <p className = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl ml-auto mr-auto text-center">WELCOME TO TECHMEDIC!</p>
        <p className = "text-xl sm:text-2xl md:text-3xl my-5 sm:my-8 md:my-10 lg:my-14 ml-auto mr-auto w-[90vw] md:w-[85vw] lg:w-[60vw] text-center">An ambulance for gadgets in pain. We provide door-to-door repair services and friends for your personal devices. </p>
        <button className = "text-lg py-2 px-4 bg-[#13a388] transition-all w-fit rounded-sm ml-auto mr-auto hover:bg-[#13a388ea]">JOIN US NOW!</button>
    </div>
  )
}
 