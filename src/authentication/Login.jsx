import React, { useContext } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {context} from '../context/Context'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [eyeIcon, setEyeIcon] = useState(faEyeSlash);
  const [displayPassword, setDisplayPassword] = useState('password');
  const [, setAuthtoken] = useContext(context);

  const handleChange = (e, fn) =>
  {
    fn(e.currentTarget.value);
  }

  const handleSubmit = async() =>
  {
    if (!pathname.includes('/login'))
    {
      let response = await fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=b6d7436b7d3fd58c7322723021c307fe8b365082`, {
        method: "GET",
        cache: "no-cache",
        credentials: "same-origin",
        redirect: "follow",
        referrerPolicy: "no-referrer", 
      });

      response = await response.json();
      if (response.errors)
      {
        setErrors('Please enter a valid email');
        return;
      }
      const {data} = response;
      const {status} = data;
      if (status !== 'valid')
      {
        setErrors('Please enter a valid email.');
        return;
      }
    }
  
    let response = await fetch(`http://localhost:5000/api/auth/${pathname.includes('/login') ? 'login' : 'register'}`, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({name, email, username, password})
    });
    
    response = await response.json();
    console.log(response);
    setErrors('');
    response.error || response.permission !== 'customer' ? setErrors(response.error || 'Wrong username or password.') : setAuthtoken(response.authToken);
    response.error || response.permission !== 'customer' ? setErrors(response.error || 'Wrong username or password.') : navigate('/products');
  }

  const togglePasswordEye = () =>{
    setEyeIcon(eyeIcon === faEye ? faEyeSlash : faEye);
    setDisplayPassword(eyeIcon === faEyeSlash ? 'text' : 'password');
  }

  return (
    <div className = "text-[#13a388] flex flex-col justify-center pt-1 min-h-screen pb-3">
        <h1 className = "text-3xl text-center pb-8 font-[ropasans]">TECH<span className = "text-[#edededdd]">MEDIC</span></h1>
        <div className = "font-[] bg-[#ededed22] w-[90%] md:w-[60%] xl:w-[30%] ml-auto mr-auto py-10 px-5 md:px-8 rounded-md shadow-lg">
            <div>
                <h1 className = "text-2xl text-center font-bold">{pathname.includes('/login') ? 'Sign In' : 'Sign Up'}</h1>
                <div className = "w-[20%] mb-14 border-b-4 rounded-sm border-[#13a388] ml-auto mr-auto">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                </div>
            </div>
            <div className = "pb-6 w-[100%] flex flex-col">
                <div className = {`w-[100%] flex text-[#edededcc] ${pathname.includes('/login') ? 'hidden' : ''}`}>
                        <input onChange = {(e)=>{handleChange(e, setName)}} value = {name} className = "bg-[#10101045] w-[100%] md:w-[80%] rounded-md py-2 px-2 focus:outline-0 mx-auto" placeholder='Name' name="username"/>
                </div>
                {pathname.includes('/login') ? '' : <br />}
                <div className = {`w-[100%] flex text-[#edededcc] ${pathname.includes('/login') ? 'hidden' : ''}`}>
                        <input onChange = {(e)=>{handleChange(e, setEmail)}} value = {email} className = "bg-[#10101045] w-[100%] md:w-[80%] rounded-md py-2 px-2 focus:outline-0 mx-auto" placeholder='Email' name="username"/>
                </div>
                {pathname.includes('/login') ? '' : <br />}
                <div className = "w-[100%] flex text-[#edededcc]">
                        <input onChange = {(e)=>{handleChange(e, setUsername)}} value = {username} className = "bg-[#10101045] w-[100%] md:w-[80%] rounded-md py-2 px-2 focus:outline-0 mx-auto" placeholder='Username' name="username"/>
                </div>
                <br />
                <div className = "w-[100%] flex text-[#edededcc]">
                  <div className='bg-[#10101045] w-[100%] md:w-[80%] rounded-md mx-auto'>
                    <input type = {`${displayPassword}`} onChange = {(e)=>{handleChange(e, setPassword)}} value = {password} className = "bg-[transparent] w-[85%] rounded-md py-2 px-2 focus:outline-0" placeholder='Password' name="password"/>
                    <button onClick={togglePasswordEye} className='w-[15%]'><FontAwesomeIcon icon={eyeIcon} style={{color: "#edededcc"}} /></button>
                  </div>
                </div>
                <p className = "md:px-1 w-[98%] md:w-[80%] mx-auto pt-3 text-[#ff1169] text-sm">{errors}</p>
                <button onClick = {handleSubmit} className = "bg-[#13a388] text-[#edededcc] ml-auto mr-auto py-2 w-[100%] md:w-[80%] px-3 mb-5 mt-3 rounded-md shadow-md hover:bg-[#13a388ee] transition-all">{pathname.includes('/login') ? 'Sign In' : 'Sign Up'}</button>
            </div>
            <div className = "border-b-4 w-[80%] ml-auto mr-auto border-[#ededed44]">
                &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <div className='w-fit mx-auto pt-4 text-[#13a388] text-sm md:text-md'>
                {pathname.includes('/login') ? <span><span className = "text-[#edededbb]">Don't have an account?&nbsp;</span> <Link to = '/register'>Create a new one!</Link></span>
                : <span><span className = "text-[#edededbb]">Already have an account?&nbsp;</span> <Link to = '/login'>Log In</Link> </span>
                } 
            </div>
        </div>
    </div>
  )
}
