import React, { useState } from 'react'
import {Auth} from "../../utils/Firebase";
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
export const Mainpage = () => {
  const [Signin,setSignin]=useState(true);
  const navigate=useNavigate();
  const Signout=()=>{
    signOut(Auth).then((val)=>{
      console.log("Value",val);
      navigate("/signin")
      setSignin(false);
    });
    ;
  }
  return (
    <>
    <div className='flex flex-row justify-around items-center p-5'>
    <p>MainPage</p>
    <button className="w-22 inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-green-400 ease disabled:bg-slate-300" onClick={Signout}>SignOut</button>
  </div>
  {Signin && (
    <div className='flex flex-col justify-center items-center'>
      <h1>Name: {localStorage.getItem("Name")}</h1>
      <h1>Email: {localStorage.getItem("Email")}</h1>
      <img src={localStorage.getItem("ProfilePic")!} alt="Profile Picture" />
    </div>
  )}
</>

  )
}
