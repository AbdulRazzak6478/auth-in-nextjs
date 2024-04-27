"use client";
import React, { useEffect, useState } from "react";
import "../../styles/signup.css";
import axios from "axios";
const page = () => {
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);
  const obj :any ={};
  const [data, setData] = useState(obj);
  const [flag, setFlag] = useState(false);
  const getUserDetails = async () => {
    try {
      setLoad(true);
      const response = await axios.get("/api/users/me");
      console.log("user profile data : ", response);
      setData(response?.data.data);
      setFlag(true);
      setLoad(false);
    } catch (error) {
      setErr(true);
      console.log("error in profile page : ", error);
    }
  };
  const onLogout = async() => {
    try {
        setLoad(true);
        const response = await axios.get("/api/users/logout");
        console.log("user profile data : ", response);
        setFlag(false);
        setLoad(false);
      } catch (error) {
        setErr(true);
        console.log("error in profile page : ", error);
      }
  };
  useEffect(() => {
    (async()=>{
        await getUserDetails();
    })()
  }, [])
  
  return (
    <div>
      <div className="verify-box">
        {err && <h1>Something went wrong in getting user details</h1>}
        {!err &&
          (flag ? (
            <div className="data">
              <h2>User Id : {data?._id}</h2>
              <p>User Name : {data?.username}</p>
              <p>Email : {data?.email}</p>
              <button className="submit" onClick={onLogout}>
                {load ? "Loading..." : "Logout"}
              </button>
            </div>
          ) : (
            <button className="submit" onClick={getUserDetails}>
              {load ? "Getting User Details ..." : "Get User Details"}
            </button>
          ))}
      </div>
    </div>
  );
};

export default page;
