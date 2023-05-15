import React, { useEffect, useState } from 'react'
import Intro from './Components/Intro'
import Navbar from './Components/Navbar'
import happy from '../assets/images/users.svg'
import completed from '../assets/images/completed.svg'
import img1 from '../assets/images/download.jpg'

export default function LandingPage() {
  const [products, setProducts] = useState([])
  const [reviews, setReviews] = useState([]);
  const [happyCustomers, setCustomers] = useState(0);

  useEffect(()=>
  {
    const getResponse = async() =>
    {
      let response = await fetch('http://localhost:5000/api/products/getfeatured', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      response = await response.json();
      response.error ? document.title = response.error : setProducts(response.products);

      response = await fetch('http://localhost:5000/api/reviews/getFeatured', {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });

      response = await response.json();
      response.error ? document.title = response.error : setReviews(response.reviews);
      response.error ? document.title = response.error : setCustomers(response.happyCustomers);
    }

    getResponse();
  }, [])
  return (
    <>
        <Navbar />
        <div className = "pt-2 pb-6 font-[ropasans]">
            <Intro />
            <div className='w-[90%] xl:w-[60%] mx-auto pb-12'>
              <h1 className='mx-auto w-fit pt-10 xl:pt-20 text-2xl xl:text-3xl'>FEATURED PRODUCTS</h1>
              <div className = "py-10 grid md:grid-cols-2 gap-4">
                {products.map(r => <div key = {r._id} className = "text-lg px-2 py-2 border-2 border-[#13a388] rounded-md">
                  <img className = 'aspect-square rounded-t-sm' src = {r.picture ? r.picture : img1} alt = {r.description}/>
                  <div className='my-2 px-0'>
                    <p className='text-xl float-right font-semibold text-[#13a388]'>Rs. {r.price.toLocaleString()}</p>
                    <p className='text-xl'>{r.name}</p>
                    <p className='text-lg text-[#ededed99]'>{r.description}</p>
                  </div>
                </div>)}
              </div>
              <h1 className='mt-2 mx-auto w-fit md:text-2xl xl:text-3xl text-sm'>LIKE SOMETHING? <span className='underline'>CREATE YOUR ACCOUNT NOW!</span></h1>
            </div>
            <div className = "bg-[#13a388] my-10 py-10 xl:py-20 lg:py-14 space-y-5">
                <div className = "grid grid-cols-2 mx-auto w-fit">
                  <img src = {happy} className='w-16' alt = "Users Icon"/> 
                  <div>
                    <h1 className='text-center text-3xl'>{happyCustomers < 10 ? '0' : ''}{happyCustomers}</h1>
                    <h1 className='text-lg'>Happy Customers</h1>
                  </div>
                </div>
                <div className = "grid grid-cols-2 mx-auto w-fit">
                  <img src = {completed} className='w-16' alt = "Tick Mark"/>
                  <div>
                    <h1 className='text-center text-3xl'>00</h1>
                    <h1 className='text-lg'>Repairs Completed</h1>
                  </div>
                </div>
            </div>
            <div className='w-[100%] px-[2%] pb-5'>
              <h1 className='mx-auto w-fit pt-8 xl:pt-20 text-2xl xl:text-3xl'>REVIEWS</h1>
              <div className = "pt-10 pb-4 flex flex-start space-x-5 carousel">
                {reviews.map(r => <div key = {r._id} className = "text-lg px-3 pt-2 pb-20 xl:pb-28 border-2 border-[#13a388] rounded-md">
                    <p className='float-right'><span className='text-[#13a388]'>✬</span> {r.Rating}.0</p>
                    <p><span className='text-[#13a388]'>◉</span> {r.User.username}</p>
                    <p className='text-[#ededed99] mx-4 w-48 xl:w-56 wrap'>{r.Review}</p>
                  </div>
                )}

              </div>
              <h1 className='mx-auto mt-10 xl:mt-10 pb-16 w-fit text-sm md:text-2xl xl:text-3xl xl:[50%]'>GET ALL YOUR DEVICES IN TIP-TOP. <span className='underline'> ORDER A REPAIR!</span></h1>
            </div>
        </div>
        <div className='font-[ropasans] md:text-lg flex justify-end bg-[#13a388] text-[#ededed] py-1 md:py-2 px-3'>
          <p><span className = 'font-sans'>©</span> TechMedic 2023</p>
        </div>
    </>
  )
}
