import React, { useContext, useEffect, useState } from 'react'
import ProductTableData from './Components/ProductTableData'
import { context } from '../context/Context';

export default function OrdersPage() {
  
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [authtoken] = useContext(context);
  useEffect(()=>
  {
    const getResponse = async () => {
      let response = await fetch("http://localhost:5000/api/orders/getOrders", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer" // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      response = await response.json(); // parses JSON response into native JavaScript objects
      response.error ? setError(response.error) : setOrders(response.orders);
    }

    getResponse();
  }, [authtoken])
  return (
    <main className="p-5">
      <div className="container lg:w-2/3 xl:w-2/3 mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Orders</h1>

        {orders.length ? orders.map(r => <div className="bg-[#ededed29] p-4 rounded-lg shadow mb-5">
          <ProductTableData order = {r}/>
        </div>) : error}

        <br className=''></br>
      </div>
    </main>
  )
}