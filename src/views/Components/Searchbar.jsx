import React, { useContext, useState } from 'react'
import { context } from '../../context/Context';

export default function Searchbar() {
  const [param, setParam] = useState('');
  const [,,allProducts,,, setProducts] = useContext(context);
  const changeParam = (e) =>
  {
    setParam(e.currentTarget.value);
    setProducts(allProducts.filter(r => r.name.toLowerCase().includes(e.currentTarget.value.toLowerCase())));
  }

  return (
    <div className = "w-fit mx-auto pt-6 pb-4">
      <input value = {param} onChange = {e => changeParam(e)} placeholder = "Search" type = "text" className='bg-[#ededed2f] px-3 py-2 rounded-md w-[90vw] md:w-[50vw] xl:w-[30vw] text-[#edededee] focus:outline-0'/>
    </div>
  )
}
