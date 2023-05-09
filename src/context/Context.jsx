import {createContext, useState} from 'react'

const context = createContext();

export default function Context(props) {
    const [authtoken, setAuthtoken] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState({productArr: [], quantities: []});
    const [subtotal, setSubtotal] = useState(0);
    return (
    <context.Provider value = {[authtoken, setAuthtoken, allProducts, setAllProducts, products, setProducts, cartProducts, setCartProducts, subtotal, setSubtotal]}>
        {props.children}
    </context.Provider>
  )
}

export {context};