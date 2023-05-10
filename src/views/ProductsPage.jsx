import React, { useContext, useEffect, useState } from 'react'
import { context } from '../context/Context';
import { Link } from 'react-router-dom';
import Searchbar from './Components/Searchbar';
import img1 from '../assets/images/download.jpg';
import Loader from '../components/Loader';


export default function ProductsPage() {

  const [authtoken,,, setAllProducts, products, setProducts, cartItems, setCartItems] = useContext(context);
  const [error, seterror] = useState('');
  const [rendered, setRendered] = useState(false);
  const [count, setCount] = useState({});
  const [limit, setLimit] = useState({});
  
  useEffect(() => {

    if (!rendered)
    {
      const getResponse = async () => {
        let response = await fetch("http://localhost:5000/api/products/getproducts", {
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
        response.error ? seterror(response.error) : setAllProducts(response.products);
        response.error ? seterror(response.error) : setProducts(response.products.sort((p1, p2) => p1.inStock < p2.inStock ? 1 : p1.inStock > p2.inStock ? -1 : 0));
        response.error ? seterror(response.error) : response.products.map(r => {count[r._id] = 1; let index = cartItems.productArr.length ? cartItems.productArr.indexOf(cartItems.productArr.filter(k => r._id === k._id)[0]) : -1; let inCart = index !== -1 ? cartItems.quantities[index] : 0; limit[r._id] = r.inStock - inCart; return 0;});
      }
  
      getResponse();
      setRendered(true);
    }
    
    !products.length ? seterror('No results found') : seterror('');
    
  }, [authtoken, setProducts, products, setAllProducts, rendered, count, cartItems.quantities, cartItems.productArr, limit]);
  
  const retIndex = (cartItem) =>
  {
    for (let i = 0; i < cartItems.productArr.length; i++)
    {
      if (cartItem._id === cartItems.productArr[i]._id)
      {
        return i;
      }
    }

    return -1;
  }

  const addToCart = (id) =>
  {

    const cartItem = products.filter(r => r._id === id)[0];
    const {productArr, quantities} = cartItems;

    console.log(productArr, quantities);
    //console.log(cartItem);
    let index = retIndex(cartItem);
    //console.log(index);
    let quanties = [...quantities];
    if (index !== -1)
    {
      const countItem = quantities[index];
      quanties[index] = countItem + count[id];      
      setCartItems({productArr, quantities: quanties});
    }
    
    else
    {
      let prods = [...productArr, cartItem];
      let quanties = [...quantities, count[id]];
      setCartItems({productArr: prods, quantities: quanties});
    }

    setLimit({...limit, [id]:limit[id] - count[id]});
    setCount({...count, [id]: 1});
  }
  
  return (
    <div className="min-h-screen">
      {rendered ? 
        <>
        <Searchbar />
        <div className={`${!error ? 'grid' : 'block'}  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-10 p-5`}>
          {error ? <p className='w-fit mx-auto'>{error}</p> : products.map(r => <div key = {r._id} className="product bg-[#ededed15] overflow-hidden rounded-md shadow border-2 border-[#13a388] transition-colors">
            <img alt = "product" className='rounded-t-md transition hover:scale-105 aspect-square' src={r.picture ? r.picture : img1}></img>
            <div className="p-3 text-[#ededed] bg-[#ededed15] rounded-b-md">
              <p className='text-2xl text-[#13a388] font-semibold mt-1s w-fit float-right'>Rs. {r.price.toLocaleString()}</p>
              <h3>
                <Link className='text-[#ededed] text-2xl hover:text-[#ededed]'>
                  {r.name}
                </Link>
              </h3>

              <div className='flex justify-between'>

                <div className="flex justify-between items-center mt-1">
                  <p className={`text-xl font-semibold ${r.inStock ? 'text-[#13a388] ' : 'text-[#ff5353]'}`}>
                
                    {r.inStock ? 'In Stock: ' : 'Out Of Stock'}
                    <span className='text-[#EDEDED] font-normal text-xl'> &nbsp; {r.inStock ? r.inStock : ''}</span>
                
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">

                <div className='flex justify-center gap-2'>

                  <button onClick={ () => setCount({...count, [r._id] : count[r._id]-1}) }  disabled={count[r._id] === 1} className='bg-[#ff5353] rounded-2xl p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                  </button>

                  <p className='text-black text-center font-lg font-bold bg-gray-200 py-1 px-2 w-10 rounded-md'>
                    {count[r._id]}
                  </p>

                  <button onClick={() => setCount({...count, [r._id] : count[r._id]+1}) } disabled={count[r._id] >= limit[r._id]} className='bg-[#13a388] rounded-2xl p-1'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>

                </div>

                <button onClick = {()=>{addToCart(r._id)}} disabled={!r.inStock || limit[r._id] === 0} className='flex items-center bg-[#13a388] text-white py-2 px-3 rounded hover:bg-[#13a388aa] disabled:bg-gray-500 transition-colors shadow-md'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>

                  Add to Cart

                </button>

              </div>

            </div>
          </div>)}
        </div></> : <Loader />}
    </div>
  )
}
