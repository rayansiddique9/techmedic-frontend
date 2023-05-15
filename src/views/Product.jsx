import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { context } from '../context/Context';
import img from '../assets/images/download.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';

export default function Product() {
    
    const {productId} = useParams();
    const [authtoken,,allProducts,,,, cartItems, setCartItems] = useContext(context);
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [usernames, setNames] = useState([]);
    const [rendered, setRendered] = useState(false);
    const [stars, setStars] = useState([false, false, false, false, false]);
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(1);
    const [review, setReview] = useState('');
    const [error, setError] = useState('');
    
    const addToCart = () =>
    {
        const index = cartItems.productArr.findIndex(r => r._id === productId);
        let quanties = [...cartItems.quantities];
        if (index !== -1) quanties[index] += count;  
        index !== -1 ? setCartItems({productArr: [...cartItems.productArr], quantities: quanties}) :  setCartItems({productArr: [...cartItems.productArr, product], quantities:[...cartItems.quantities, count]});
        setCount(1);
    }

    const changeReview = (e) =>
    {
        setReview(e.currentTarget.value);
    }
    
    const resetStars = () =>
    {
        let change = [...stars];
        for (let i = 0; i < 5; i++)
        {
            change[i] = false;
        }

        setStars(change);
        setRating(0);
    }

    const postReview = async(e) =>
    {
        e.preventDefault();
        
        if (rating === 0)
        {
            setError('Please provide a rating');
            resetStars();
            return;
        }
        
        if (review.length === 0)
        {
            setError('Please provide a review');
            resetStars();
            return;
        }
        
        setError('');
        let response = await fetch(`http://localhost:5000/api/reviews/addReview`, {
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
            body: JSON.stringify({productid: productId, rating, review})
        });
        
        response = await response.json();
        response.error ? setError(response.error) : setRendered(false);
        setReview('');
        resetStars('');
    }

    const clickStars = (numStars) =>
    {
        let change = [...stars];
        let i = 0;
        for (i = 0; i < numStars; i++)
        {
            change[i] = true;
        }

        for (i; i < stars.length; i++)
        {
            change[i] = false;
        }
        
        setRating(numStars);
        setStars(change);
    }


    const updateCount = (type) =>
    {
        type === '+' ? setCount(count + 1) : setCount(count - 1);
    }

    useEffect(() =>
    {
        setProduct(allProducts.filter(r => r._id === productId)[0]);
        const getResponse = async() =>
        {
            let response = await fetch(`http://localhost:5000/api/reviews/getReview/${productId}`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
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
            });

            response = await response.json();
            console.log(response);
            response.error ? setReviews([]) :  setReviews(response.reviews); 
            response.error ? setNames([]) :  setNames(response.users); 
            setRendered(true);
        }

        if (!rendered){getResponse();}
    }, [allProducts, productId, authtoken, reviews, usernames, rendered]);

    return (
        product.name ? <div className='grid md:grid-cols-2 space-y-3 md:space-y-0 w-[85%] md:w-[95%] lg:w-[80%] mx-auto md:gap-4 lg:gap-0 rounded-md py-9'>
                <div className='bg-[#ededed24] md:w-[100%] lg:w-[90%] rounded-b-md'>
                    <img className='rounded-t-md' src = {product.picture ? product.picture : img} alt = "product"/>
                    <div className='p-4'>
                        <p className='float-right text-2xl font-semibold text-[#13a388]'>Rs. {product.price.toLocaleString()}</p>
                        <p className='text-2xl'>{product.name}</p>
                        <p>{product.description.length ? product.description : '-'}</p>
                        <div className='float-right'>

                            <div className='flex gap-2'>
                                <button disabled = {count === 1}  onClick = {() => updateCount('-')} className='bg-[#ff5353] rounded-2xl p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                                </button>

                                <p className='text-black text-center font-lg font-bold bg-gray-200 py-1 px-2 w-10 rounded-md'>{count}</p>
                                <button disabled = {cartItems.productArr.findIndex(r => r._id === productId) !== -1 ? (count ===  product.inStock - cartItems.quantities[cartItems.productArr.findIndex((r) => r._id === productId)]) : (count === product.inStock)} onClick = {() => updateCount('+')} className='bg-[#13a388] rounded-2xl p-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                </button>
                            </div>
                            <button disabled = {product.inStock - cartItems.quantities[cartItems.productArr.findIndex(r => r._id === productId)] === 0 || product.inStock === 0} onClick = {addToCart} className='my-4 flex items-center bg-[#13a388] text-white py-2 px-3 rounded hover:bg-[#13a388aa] disabled:bg-gray-500 transition-colors shadow-md'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            Add to Cart

                            </button>
                        </div>
                        <p className='w-fit'>Remaining in Stock: {product.inStock}</p>
                    </div>
                </div>
                <div className='bg-[#ededed24] rounded-md h-[27rem]'>
                    <p className= "text-xl p-5">Reviews</p>
                    <div className='px-5 overflow-auto h-[22rem]'>
                    {reviews && reviews.length ? reviews.map(r => <div key = {r._id} className='text-[#edededed]'>
                                <p className='float-right text-[#13a388]'>{r.Rating}.0</p>
                                <p><span className='border-2 rounded-2xl text-xs border-[#13a388]'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>&nbsp;{usernames[reviews.indexOf(r)]}</p>
                                <p className='text-[#edededa5]'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {r.Review}</p>
                                <br />
                            </div>) : 'No reviews yet'} 
                    </div>
                    <br />
                    <div className='bg-[#ededed24] p-4 rounded-md'>
                        <form onSubmit={postReview}>
                            <FontAwesomeIcon onClick = {()=>{clickStars(1)}} icon={faStar} style={{color:`${stars[0] ? '#13a388' : '#edededed'}`, cursor: 'pointer'}}/>
                            <FontAwesomeIcon onClick = {()=>{clickStars(2)}} icon={faStar} style={{color:`${stars[1] ? '#13a388' : '#edededed'}`, cursor: 'pointer'}}/>
                            <FontAwesomeIcon onClick = {()=>{clickStars(3)}} icon={faStar} style={{color:`${stars[2] ? '#13a388' : '#edededed'}`, cursor: 'pointer'}}/>
                            <FontAwesomeIcon onClick = {()=>{clickStars(4)}} icon={faStar} style={{color:`${stars[3] ? '#13a388' : '#edededed'}`, cursor: 'pointer'}}/>
                            <FontAwesomeIcon onClick = {()=>{clickStars(5)}} icon={faStar} style={{color:`${stars[4] ? '#13a388' : '#edededed'}`, cursor: 'pointer'}}/>
                            <input placeholder = "Add a review..." className='mt-2 w-[100%] p-1 rounded-md px-2 bg-[#10101045] focus:outline-0' value = {review} onChange={changeReview}/>
                            <p className='text-sm mt-2 text-[#ff5353]'>{error}</p>
                            <button className='w-[100%] mt-2 px-2 py-1 bg-[#13a388] rounded-md hover:bg-[#13a388aa] transition-all'>Post</button>
                        </form>
                    </div>
                    <br />
                    <br />
                </div>
            </div> : <Loader />
        
    )
}