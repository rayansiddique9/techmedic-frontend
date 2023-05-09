import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { context } from "../context/Context";

export default function NavBar(){
    const [navWidth, setNavWidth] = useState('w-0'); 
    const [, setAuthtoken] = useContext(context);
    const navigate = useNavigate();
    const [,,,,,, cartItems, setCartItems] = useContext(context)
    const hamClick = () =>
    {
        navWidth === 'w-[15rem]' ? setNavWidth('w-0') : setNavWidth('w-[15rem]');
    }

    const logOut = () =>
    {
        setAuthtoken('');
        setCartItems({productArr:[], quantities:[]});
        navigate('/');
    }
        
    return <header className="flex justify-between text-white  bg-[#ededed15] px-3">
            <div>
                <NavLink to="/products" className="text-white block py-navbar-item">
                <p className = "text-2xl"><span>TECH</span><span className = "text-[#13a388]">MEDIC</span></p>
                </NavLink>
            </div>

            <div className={`whitespace-nowrap block overflow-hidden md:hidden fixed z-20 top-0 left-0 bottom-0 h-full ${navWidth} bg-[#3f3a3a] transition-all shadow-2xl`}>
            <p className = "text-2xl w-fit px-4 my-5"><span>TECH</span><span className = "text-[#13a388]">MEDIC</span></p>
                <ul className="">
                    
                    <li><NavLink onClick = {hamClick} to= "/products" className="flex items-center px-navbar-item py-2  hover:bg-slate-600 transition-colors">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        
                        Products
                    </NavLink></li>

                    <li><NavLink onClick = {hamClick} to= "/orders" className="flex items-center px-navbar-item py-2 hover:bg-slate-600 transition-colors">
                        
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-boxes w-5 h-5 mr-2" viewBox="0 0 16 16"> <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/> </svg>
                        
                        Orders
                        
                    </NavLink></li>
                    
                    <li><NavLink onClick = {hamClick} to= "/cart" className="flex items-center px-navbar-item py-2 hover:bg-slate-600 transition-colors">
                       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                            <path stto-linecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        Cart <span className="px-2 font-thin text-sm bg-[#13a388] mx-3 rounded-lg">{cartItems.quantities.length && Array.isArray(cartItems.quantities) ? cartItems.quantities.reduce((a,b)  => a+b, 0) : 0}</span>
                    </NavLink></li>
                    
                    <li><NavLink onClick = {hamClick} to= "/customerService" className="flex items-center px-navbar-item py-2 hover:bg-slate-600 transition-colors">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        Customer Service
                        
                    </NavLink></li>

                    <li><NavLink onClick = {logOut} to= "/" className="flex items-center py-2 px-4 mt-2 mr-2 ml-2 bg-[#ff5353] rounded hover:bg-[#ff5353aa] transition-all">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>


                        Logout

                    </NavLink></li>

                </ul>
            </div>

            <nav className="hidden md:block text-lg">
                <ul className="grid grid-flow-col items-center">
                    
                    <li><NavLink to= "/products" className="block px-navbar-item py-navbar-item  hover:bg-slate-600 transition-colors">
                        Products
                    </NavLink></li>

                    <li><NavLink to= "/orders" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors ml-3">
                        
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-boxes w-6 h-6 mr-2" viewBox="0 0 16 16"> <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/> </svg>
                        
                        Orders
                        
                    </NavLink></li>
                    
                    <li><NavLink to= "/cart" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors ml-3">
                       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>

                        Cart <span className="px-2 font-thin text-sm bg-[#13a388] mx-2 rounded-lg">{cartItems.quantities.length && Array.isArray(cartItems.quantities) ? cartItems.quantities.reduce((a,b)  => a+b, 0) : 0}</span>
                    </NavLink></li>

                    <li><NavLink to= "/customerService" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors ml-3">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>

                        Customer Service
                        
                    </NavLink></li>

                    <li><NavLink onClick = {logOut} to= "/" className="flex items-center py-2 px-2 bg-[#ff5353] rounded hover:bg-[#ff5353dd] transition-colors ml-3">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>


                        Logout
                        
                    </NavLink></li>
                </ul>

            </nav>

            <button onClick= {hamClick} className="block md:hidden">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

            </button>

        </header>
    }
 