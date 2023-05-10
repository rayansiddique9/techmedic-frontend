import React, { useContext, useState } from 'react';
import img1 from '../assets/images/download.jpg';
import { context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CheckoutPage() {

    const [authtoken, , , , , , cartitems, setCartItems, subtotal,] = useContext(context);
    const [address, setAddress] = useState('');
    const [errors, setErrors] = useState('');
    const [method, setMethod] = useState('COC');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e, fn) =>
    {
      fn(e.currentTarget.value);
    }
    
    const placeOrder = () => {
        const getResponse = async () => {
            let response = await fetch("http://localhost:5000/api/orders/orderProduct", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cach only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authtoken
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({

                    Product: cartitems.productArr.map(r => r._id),
                    Quantity:cartitems.quantities,
                    addr: address,
                    bill: (subtotal+500),
                    paymentMethod: "COD"

                })
            });
            response = await response.json(); // parses JSON response into native JavaScript objects
            setErrors('');
        
            response.error ? setErrors(response.error[0].msg) : setDisabled(true);
            response.error ? setErrors(response.error[0].msg) : toast.success('Order Placed');
            response.error ? setErrors(response.error[0].msg) : setCartItems({productArr:[], quantities:[]});
            response.error ? setErrors(response.error[0].msg) : navigate('/products');
        }

        getResponse();

    };


    return (
        <div className = "flex flex-col justify-center min-h-screen">
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 py-10">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-[#edededdd]">Check your items. And select a suitable shipping method.</p>
                    { cartitems.productArr.map(r => <div className="mt-8 space-y-3 rounded-lg shadow-md bg-[#ededed24] px-2 py-4 sm:px-6">
                        <div className="flex flex-col rounded-lg bg-[transparent] sm:flex-row">
                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={r.picture ? r.picture : img1} alt="" />
                            <div className="flex w-full flex-col px-4 py-4">
                                <span className="font-semibold">{r.name}</span>
                                <span className="float-right text-[#13a388]">
                                    {cartitems.quantities[cartitems.productArr.indexOf(r)]}
                                </span>
                                <p className="text-lg font-bold">Rs. {r.price.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>)}

                    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                    <form className="mt-5 grid gap-6">
                        <div className={`relative ${method === 'COD' ? 'bg-[#13a388]' : 'bg-[transparent]'} rounded-md`} onClick = {() => setMethod('COD')}>
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label className="peer-checked:border-gray-700 peer-checked:bg-[#13a388] flex cursor-pointer select-none rounded-lg border border-[#13a388] p-4" for="radio_1">
                                <div className="">
                                    <span className="mt-2 font-semibold">COD</span>
                                    <p className="text-sm leading-6 text-[#edededaa]">Cash on Delivery</p>
                                </div>
                            </label>
                        </div>
                        <div className={`relative ${method === 'COC' ? 'bg-[#13a388]' : 'bg-[transparent]'} rounded-md`} onClick = {() => setMethod('COC')}>
                            <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                            <label className="peer-checked:border-gray-700 peer-checked:bg-[#13a388] flex cursor-pointer select-none rounded-lg border border-[#13a388] p-4" for="radio_2">
                                <div className="">
                                    <span className="mt-2 font-semibold">COC</span>
                                    <p className="text-[#edededaa] text-sm leading-6">Credit Card</p>
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div className="mt-10 bg-[#ededed24] rounded-md px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <div>
                        {/* <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                        <div className="relative">
                            <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            </div>
                        </div> */}
                        {/* <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
                        <div className="relative">
                            <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>
                            </div>
                        </div> */}
                        <label for="card-no" className={`${method === 'COD' ? 'h-0 overflow-hidden': 'h-fit transition-all'} transition-height mt-4 mb-2 block text-sm font-medium`}>Card Details</label>
                        <div className={`flex space-x-3 transition-all ${method === 'COD' ? 'h-0 overflow-hidden': 'h-fit transition-height'}`}>
                            <div className="relative w-7/12 flex-shrink-0">
                                <input max = "9999999999999999" min = "0" id="card-no" name="card-no" type = "number" className="bg-[#10101045] w-full rounded-md px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:outline-0" placeholder="xxxx-xxxx-xxxx-xxxx" />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                    </svg>
                                </div>
                            </div>
                            <input type="number" name="credit-expiry-month" className="bg-[#10101045] w-full rounded-md px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:outline-0" placeholder="MM" min = "1" max = "12"/>
                            <input type="number" name="credit-expiry-year" className="bg-[#10101045] w-full rounded-md px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:outline-0" placeholder="YY" min = "0" max = "99"/>
                            <input type="number" min = "0" max = "999" name="credit-cvc" className="bg-[#10101045] w-1/6 flex-shrink-0 rounded-md px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:outline-0" placeholder="CVC" />
                        </div>
                        <div>
                        <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                        <div className="flex flex-col sm:flex-row">
                            <div className="relative flex-shrink-0 sm:w-7/12">
                                <input onChange={(e) => handleChange(e, setAddress)} value={address} type="text" id="billing-address" name="billing-address" className="bg-[#10101045] w-full rounded-md px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:outline-0" placeholder="Street Address" />
                                <p className = "md:px-1 w-[98%] md:w-[80%] mx-auto pt-3 text-[#ff1169] text-sm">{errors}</p>
                                
                            </div>
                        </div>
                            
                        </div>

                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-[#edededdd]">Subtotal</p>
                                <p className="font-semibold text-[#13a388]">Rs. {subtotal.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-[#edededdd]">Shipping</p>
                                <p className="font-semibold text-[#13a388]">Rs. 200</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-[#edededdd]">Total</p>
                            <p className="text-2xl font-semibold text-[#13a388]">Rs. {(subtotal+200).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <button disabled = {disabled} onClick={() => placeOrder()} className="mt-4 mb-8 w-full rounded-md bg-[#13a388] hover:bg-[#13a388aa] transition-all px-6 py-3 font-medium text-[#edededee]">Place Order</button>
                </div>
            </div>
        </div>

    )
}
