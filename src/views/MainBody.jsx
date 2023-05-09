import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import Login from '../authentication/Login'
import { Route, Routes } from 'react-router-dom'
import Products from './ProductsPage'
import Cart from './CartPage'
import Orders from './OrdersPage'
import CustomerService from './CustomerService'
import { context } from '../context/Context'
import LandingPage from '../landing/LandingPage'

export default function MainBody() {
  const [authtoken] = useContext(context);

  return (
    <>
        {authtoken.length ? <div className = 'font-[ropasans]'><NavBar/>
          <div className='content'>  
              <Routes>
                <Route path ="/products" element = {<Products />}></Route>
                <Route path ="/customerService" element = {<CustomerService/>}></Route>
                <Route path ="/orders" element = {<Orders/>}></Route>
                <Route path ="/cart" element = {<Cart/>}></Route>
              </Routes>
          </div></div> : <><Routes>
                <Route path ="/" element = {<LandingPage/>}></Route>
                <Route path = "/login" element = {<Login />} />
                <Route path = "/register" element = {<div><Login /></div>} />
            </Routes> </>
        }   
    </>
  )
}
