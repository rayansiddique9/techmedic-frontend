import React, { useContext, useEffect, useState } from 'react'
import img1 from '../assets/images/download.jpg';
import { context } from '../context/Context';

export default function CartPage() {

  const [,,,,,, cartItems, setCartItems] = useContext(context);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let subtotal = 0;
    for (let i = 0; i < cartItems.productArr.length; i++)
    {
      subtotal += cartItems.productArr[i].price * cartItems.quantities[i];
    }

    setTotal(subtotal);
  }, [setTotal,cartItems.productArr, cartItems.quantities]);
  
  const changeCount = (id, type) =>
  {
    const prods = [...cartItems.productArr];
    let quanties = [...cartItems.quantities];
    const order = prods.filter(r => r._id === id)[0];
    let index = prods.indexOf(order);
    type === '+' ? quanties[index] += 1 : quanties[index] -= 1;
    setCartItems({productArr: prods, quantities: quanties});
  }

  const removeProduct = (id) =>
  {
    let prods = [...cartItems.productArr];
    let quanties = [...cartItems.quantities];
    for (let i = 0; i < cartItems.productArr.length; i++)
    {
      if(cartItems.productArr[i]._id === id)
      {
        if(i === 0)
        {
          prods.shift();
          quanties.shift();
          console.log('ye he');
          console.log(prods, quanties);


        }
        else if(i === prods.length-1)
        {
          prods.pop();
          quanties.pop();
          console.log('ye he');
          console.log(prods, quanties);
        }
        else
        {
          prods.splice(i,1);
          quanties.splice(i,1)
        }
        setCartItems({productArr:prods, quantities: quanties});
        break;
      }
    }
  }

  return (
    <div className='container mx-auto text-[#ededed] lg:w-2/3 py-8 md:px-5 xl:px-10'>
      
      <div className='p-5'>
        <div className='flex items-center gap-2 '>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 mb-2 text-[#13a388]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>

          <h1 className='pb-3 text-3xl font-semibold mb-2'>My Cart</h1>
          
        </div>

        <div className='bg-[#ededed23] rounded-lg px-3 py-2'>

          <div>
            {cartItems.productArr.length && Array.isArray(cartItems.productArr) ? cartItems.productArr.map(r => <div className='border-b border-gray-200 flex flex-col sm:flex-row items-center gap-4 py-5'>
              <img src={r.picture ? r.picture : img1} className='w-36 rounded-md' alt = "preview"/>
              <div className='flex flex-col w-full justify-between px-4'>
                <div className='flex justify-between'>
            
                  <h3 className='text-2xl mb-2'>{r.name}</h3>
                  <span className='text-2xl text-[#13a388] font-semibold w-fit float-right'>
                    Rs. {r.price.toLocaleString()}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-1'>
                    <button onClick={() => changeCount(r._id, '-')} disabled={cartItems.quantities[cartItems.productArr.indexOf(r)] === 1} className='bg-[#ff5353] rounded-2xl p-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <p className='text-black mx-1 text-center font-lg font-bold bg-gray-200 py-1 px-2 w-10 rounded-sm'>
                      {cartItems.quantities[cartItems.productArr.indexOf(r)]}
                    </p>
                    <button onClick={() => changeCount(r._id, '+')} disabled={cartItems.quantities[cartItems.productArr.indexOf(r)] === r.inStock} className='bg-[#13a388] rounded-2xl p-1'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>
                  <button onClick={() => removeProduct(r._id)} className='bg-[#ff5353] hover:bg-[#ff5353dd] transition-colors text-lg text-white rounded-md py-1 px-2'>Remove</button>
                </div>
              </div>
            </div>) : '-'}
          </div>
          <div className='mt-5 pt-5 px-1'>
            <div className='flex justify-between'>
              <span className='font-bold text-xl'>Subtotal</span>
              <span className='text-2xl text-[#13a388] font-semibold w-fit float-right'>Rs. {total.toLocaleString()}</span>
            </div>

            <p className='text-lg'> Shipping cost will be added at checkout</p>

            <button className='mt-4 btn-primary w-full bg-[#13a388] py-2 rounded-lg hover:bg-[#13a388dd] transition-all my-1 text-2xl text-[#ededed] disabled:bg-gray-500' disabled = {!cartItems.productArr.length}>Checkout</button>

          </div>
          
        </div>


      </div>
    </div>
  )
}
