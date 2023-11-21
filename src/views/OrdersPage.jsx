import React, { useContext, useEffect, useState } from 'react'
import ProductTableData from './Components/ProductTableData'
import { context } from '../context/Context';
import Loader from '../components/Loader';
import RepairTableData from './Components/RepairTableData';

export default function OrdersPage() {
  
  const [orders, setOrders] = useState({product: [], repair:[]});
  const [error, setError] = useState({product: '', repair: ''});
  const [authtoken] = useContext(context);
  const [rendered, setRendered] = useState(false);
  const [isProduct, toggleType] = useState(true);

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
      response.error ? setError({...error, product: response.error}) : setOrders({...orders, product: response.orders});
      
      let response2 = await fetch("http://localhost:5000/api/orderRepair/getOrderRepair", {
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
      response2 = await response2.json(); // parses JSON response into native JavaScript objects
      response2.error ? setError({...error, repair: response2.error}) : setOrders({...orders, repair: response2.orderRepair});
      setRendered(true);
    }
    
    getResponse();
  }, [authtoken])

  return (
    <main className="p-5">
      {
        rendered ? 
        <div className="container lg:w-2/3 xl:w-2/3 mx-auto min-h-screen">
        <h1 className="text-3xl font-semibold mb-6 mt-4">Orders</h1>
        <nav className='flex mx-auto w-fit space-x-4 mt-5 mb-10'>
          <button onClick={() => toggleType(true)} className={`px-4 py-1 rounded-full ${isProduct ? 'bg-[#13A388]' : ''} active:bg-[#13B388] hover:bg-[#13B388] text-[#ededed] transition-all`}>Product</button>
          <button onClick={() => toggleType(false)} className={`px-4 py-1 rounded-full ${!isProduct ? 'bg-[#13A388]' : ''} active:bg-[#13B388] hover:bg-[#13B388] text-[#ededed] transition-all`}>Repair</button>
        </nav>

        {
          isProduct ?
          orders.product.length ? orders.product.map(r => <div key={r} className="bg-[#ededed29] p-4 rounded-lg shadow mb-5">
            <ProductTableData order = {r}/>
          </div>) : <p className='text-[#edededaa] text-center flex flex-col justify-center'>{error?.product}</p> : ''
        }

        {
          !isProduct ?
          orders?.repair.length ? orders.repair.map(r => <div key={r} className="bg-[#ededed29] p-4 rounded-lg shadow mb-5">
            <RepairTableData order = {r}/>
          </div>) : <p className='text-[#edededaa] text-center flex flex-col justify-center'>{error?.repair}</p> : ''
        }

        <br />
        </div> : <Loader />
      }
    </main>
  )
}