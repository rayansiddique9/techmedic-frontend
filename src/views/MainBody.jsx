import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import Login from '../authentication/Login'
import { Route, Routes } from 'react-router-dom'
import Products from './ProductsPage'
import Cart from './CartPage'
import Orders from './OrdersPage'
import CustomerService from './CustomerService'
import Checkout from './CheckoutPage'
import { context } from '../context/Context'
import LandingPage from '../landing/LandingPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function MainBody() {
  const [authtoken] = useContext(context);

  return (
    <>
      {authtoken.length ? <div className='font-[ropasans]'>
        <div className='content'>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
          <Routes>
            <Route path="/products" element={<><NavBar /><Products /></>}></Route>
            <Route path="/customerService" element={<><NavBar /><CustomerService /></>}></Route>
            <Route path="/orders" element={<><NavBar /><Orders /></>}></Route>
            <Route path="/cart" element={<><NavBar /><Cart /></>}></Route>
            <Route path="/checkout" element={<><Checkout /></>}></Route>
          </Routes>
        </div></div> : <><Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path = "/register" element = {<><Login /></>} />
        </Routes> </>
      }
    </>
  )
}
