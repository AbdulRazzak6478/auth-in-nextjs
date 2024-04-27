'use client';
import React, { useState } from 'react';
import "../../styles/signup.css";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const page = () => {
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);
    const token = window.location.search.split('=')[1];
    const router = useRouter();
    // const router = useRouter();
    // const {query} = router;
    // const urlToken = query.token;
    const verifyHandler = async() =>{
        try {
            setLoad(true);
            console.log('token : ',token);
            const response = await axios.post('/api/users/verifyemail',{token});
            console.log('data from verify email page  : ',response);
            setLoad(false);
            router.push('/login');
        } catch (error) {
            setErr(true);
            console.log('error in verify email : ',error);
        }
    }

  return (
    <>
    {
        err && (<h1>Error in verifying the account with token</h1>)
    }
    {
        !err && (<div className='verify-box'>
        <h3>Click Below Button to Verify .</h3>
        <button className='submit' onClick={verifyHandler}>{load ? 'Verifying...':'verify'}</button>
    </div>)
    }
    </>
    
  )
}

export default page