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
                <NavLink to="/products" className="text-white py-navbar-item block">
                <p className = "text-2xl"><span>TECH</span><span className = "text-[#13a388]">MEDIC</span></p>
                </NavLink>
            </div>

            <div className={`whitespace-nowrap block overflow-hidden lg:hidden fixed z-20 top-0 left-0 bottom-0 h-full ${navWidth} bg-[#3f3a3a] transition-all shadow-2xl`}>
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
                    
                    <li><NavLink onClick = {hamClick} to= "mailto:razah12145@gmail.com" className="flex items-center px-navbar-item py-2 hover:bg-slate-600 transition-colors">
                        Contact
                        
                    </NavLink></li>
                    <li><NavLink onClick = {hamClick} to= "/profile" className="flex items-center px-navbar-item py-2 hover:bg-slate-600 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#edededclip0_15_82)"> <rect width="24" height="24" fill="white"></rect> <g filter="url(#edededfilter0_d_15_82)"> <path d="M14.3365 12.3466L14.0765 11.9195C13.9082 12.022 13.8158 12.2137 13.8405 12.4092C13.8651 12.6046 14.0022 12.7674 14.1907 12.8249L14.3365 12.3466ZM9.6634 12.3466L9.80923 12.8249C9.99769 12.7674 10.1348 12.6046 10.1595 12.4092C10.1841 12.2137 10.0917 12.022 9.92339 11.9195L9.6634 12.3466ZM4.06161 19.002L3.56544 18.9402L4.06161 19.002ZM19.9383 19.002L20.4345 18.9402L19.9383 19.002ZM16 8.5C16 9.94799 15.2309 11.2168 14.0765 11.9195L14.5965 12.7737C16.0365 11.8971 17 10.3113 17 8.5H16ZM12 4.5C14.2091 4.5 16 6.29086 16 8.5H17C17 5.73858 14.7614 3.5 12 3.5V4.5ZM7.99996 8.5C7.99996 6.29086 9.79082 4.5 12 4.5V3.5C9.23854 3.5 6.99996 5.73858 6.99996 8.5H7.99996ZM9.92339 11.9195C8.76904 11.2168 7.99996 9.948 7.99996 8.5H6.99996C6.99996 10.3113 7.96342 11.8971 9.40342 12.7737L9.92339 11.9195ZM9.51758 11.8683C6.36083 12.8309 3.98356 15.5804 3.56544 18.9402L4.55778 19.0637C4.92638 16.1018 7.02381 13.6742 9.80923 12.8249L9.51758 11.8683ZM3.56544 18.9402C3.45493 19.8282 4.19055 20.5 4.99996 20.5V19.5C4.70481 19.5 4.53188 19.2719 4.55778 19.0637L3.56544 18.9402ZM4.99996 20.5H19V19.5H4.99996V20.5ZM19 20.5C19.8094 20.5 20.545 19.8282 20.4345 18.9402L19.4421 19.0637C19.468 19.2719 19.2951 19.5 19 19.5V20.5ZM20.4345 18.9402C20.0164 15.5804 17.6391 12.8309 14.4823 11.8683L14.1907 12.8249C16.9761 13.6742 19.0735 16.1018 19.4421 19.0637L20.4345 18.9402Z" fill="#ededed"></path> </g> </g> <defs> <filter id="filter0_d_15_82" x="2.55444" y="3.5" width="18.8911" height="19" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix> <feOffset dy="1"></feOffset> <feGaussianBlur stdDeviation="0.5"></feGaussianBlur> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"></feColorMatrix> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_82"></feBlend> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_82" result="shape"></feBlend> </filter> <clipPath id="clip0_15_82"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
                        Profile
                    </NavLink></li>
                    
                    <li><NavLink onClick = {logOut} to= "/" className="flex items-center py-2 px-4 mt-2 mr-2 ml-2 bg-[#ff5353] rounded hover:bg-[#ff5353aa] transition-all">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>


                        Logout

                    </NavLink></li>

                </ul>
            </div>

            <nav className="hidden lg:block text-lg">
                <ul className="grid grid-flow-col items-center w-[100%]">
                    
                    <li><NavLink to= "/products" className="block px-navbar-item py-navbar-item  hover:bg-slate-600 transition-colors">
                        Products
                    </NavLink></li>

                    <li><NavLink to= "/orders" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors ml-3">
                                                
                        Orders
                        
                    </NavLink></li>
                    
                    <li><NavLink to= "/cart" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors ml-3">
                        Cart <span className="px-2 font-thin text-sm bg-[#13a388] mx-2 rounded-lg">{cartItems.quantities.length && Array.isArray(cartItems.quantities) ? cartItems.quantities.reduce((a,b)  => a+b, 0) : 0}</span>
                    </NavLink></li>

                    <li><NavLink to= "/profile" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors">
                        Profile
                        
                    </NavLink></li>
                    <li><NavLink to= "mailto:razah12145@gmail.com" className="flex items-center px-navbar-item py-navbar-item hover:bg-slate-600 transition-colors">
                        Contact
                    </NavLink></li>
                    <li><NavLink onClick = {logOut} to= "/" className="flex items-center py-2 px-2 bg-[#ff5353] rounded hover:bg-[#ff5353dd] transition-colors ml-3">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>


                        Logout
                        
                    </NavLink></li>
                </ul>

            </nav>

            <button onClick= {hamClick} className="block lg:hidden">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

            </button>

        </header>
    }
 