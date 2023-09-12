import React, { useState } from 'react'
import {Auth,messaging} from "../../utils/Firebase";
import { signOut } from 'firebase/auth';
import { getToken } from 'firebase/messaging';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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

  async function requestPermission(){
    const permission=await Notification.requestPermission();
    if (permission==="granted"){
      //generate token
     const token=await getToken(messaging,{vapidKey:"BMWjUaBizMjnrLe4zouXi-X53rIBVTOE3wxKB54Z2qpH-8B2mT4vsJIAdSxc_Lp4MtTvDCnmwsEKbSRRIYOD3Lg"})
     localStorage.setItem("Token",token);
     console.log("Token get",token);
    }else if(permission==="denied"){
      alert("Permission Denied You wont get notified!");
    }
  }


  useEffect(()=>{
  requestPermission();
  },[])

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
