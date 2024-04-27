'use client';
import React, { useState } from 'react';
import "../../styles/signup.css";
const page = () => {
    const [load, setLoad] = useState(false);
    const verifyHandler = () =>{
        setLoad(true);
    }
  return (
    <div className='verify-box'>
        <h3>Click Below Button to Verify .</h3>
        <button className='submit' onClick={verifyHandler}>{load ? 'Verifying...':'verify'}</button>
    </div>
  )
}

export default page