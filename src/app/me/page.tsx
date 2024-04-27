'use client'
import React, { useState } from 'react'
import "../../styles/signup.css";
const page = () => {
    const [load, setLoad] = useState(false);
    const getUserDetails = () =>{
        setLoad(true);
    }
    const onLogout = ()=>{
        setLoad(true);

    }
  return (
    <div>
        <div className="verify-box">
            <div className="data">
                <h2>User Id : </h2>
                <p>User Name : </p>
                <p>Email : </p>
                <button className='submit' onClick={onLogout}>{load ? 'Loading...':'Logout'}</button>
            </div>
            <button className='submit' onClick={getUserDetails}>{load ? 'Getting User Details ...':'Get User Details'}</button>
        </div>
    </div>
  )
}

export default page