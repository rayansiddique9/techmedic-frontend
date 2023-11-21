import React, { useContext, useEffect, useRef, useState } from 'react'
import { context } from '../context/Context';
import Loader from '../components/Loader';
import RichTextField from '../components/react-admin';
// import { RichTextField } from 'react-admin'

export default function Profile() {

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [authtoken] = useContext(context);
  const nameRef = useRef(null);

  const saveName = async () =>
  {
    const sanitize = (string) =>
    {
      let str = '';

      for (let i = 0; i < string.length; i++)
      {
        string[i] === '<' ? str += '&lt;'
        :
        string[i] === '>' ? str += '&gt;'
        :
        str += string[i];
      }

      return str;
    }

    setEditing(editing => !editing);
    // const name = nameRef?.current?.value; //vulnerability
    const name = sanitize(nameRef?.current?.value); //mitigation

    if (editing)
    {
      setProfile({...profile, name})
      await fetch('http://localhost:5000/api/auth/setname', 
      {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json",
          "auth-token": authtoken
        },
        body: JSON.stringify({ name })
      })
    }
  } 

  useEffect(() =>
  {
    setLoading(true);
    const getProfile = async () =>
    {
      const user = await fetch('http://localhost:5000/api/auth/getuser', {
        headers: {
          "Content-Type": "application/json",
          "auth-token": authtoken
        },
      });
      const profile = await user.json();
      setProfile(profile);
    }

    getProfile();
    setLoading(false);
  }, [authtoken]);

  return (
    !loading ?
    <div className='h-[60vh] flex flex-col justify-center w-[100%] px-10 space-y-5'>
      <h1 className='text-3xl'>Profile</h1>
      <p className='text-lg'>Name: &nbsp;
      {
        editing 
        ?
          <input defaultValue={profile?.name} ref={nameRef} className='bg-gray-800 focus:outline-0 px-2 py-1 rounded-md text-[#eded] '/> 
        :
          <RichTextField string={profile?.name} /> 
      }
        <button className='ml-4 px-2 py-0.5 bg-[#13a388] hover:bg-[#13a388aa] transition-all rounded-md' onClick={saveName}>{editing ? 'Save' : 'Edit' }</button>
      </p>
      <p className='text-lg'>Username: &nbsp;<span className='text-[#13a388]'>{profile?.username}</span></p>
      <p className='text-lg'>Email: &nbsp;<span className='text-[#13a388]'>{profile?.email}</span></p>
    </div> : <Loader />
  )
}
