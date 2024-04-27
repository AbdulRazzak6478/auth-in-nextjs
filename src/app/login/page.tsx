"use client";
import React, { useState } from "react";
import "../../styles/signup.css";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormValidationWithoutYup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState(false);

  const handleChange = (e: any) => {
    console.log(
      "events, name : ",
      e.target.name,
      " , value : ",
      e.target.value
    );
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email: any) => {
    // regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password: any) => {
    //Regular expression for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      uppercase.test(password) &&
      lowercase.test(password)
    );
  };

  const validateFormWithOutYup = () => {
    let newErrors: any = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one lowercase, one uppercase";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const router =useRouter();
  const onSubmitHandler = async(e: any) => {
    try {
      e.preventDefault();
      const isValid = validateFormWithOutYup();
      if (isValid) {
        setLoad(true);
        const response = await axios.post('/api/users/login',formData);
        console.log("form is submitted ", response);

        setLoad(false);
        router.push('/me');
      } else {
        console.log("Form Validation is Failed");
      }
    } catch (error) {
      setErr(true);
      console.log("error in login page : ", error);
    }
  };
  return (
    <>
      <div className="form-container">
        {err && <h1>Something went wrong with sign up the user </h1>}
        {!err && (
          <>
            <h2>Login</h2>
            <form action="">
              <div className="field">
                <label htmlFor="">Email*:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Please Enter Your Email address ..."
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="field">
                <label htmlFor="">Password* :</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Please Enter Password ..."
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
              <div className="direct">
                <Link href="#" className="forget link">
                  New User?
                </Link>
                <Link href="/signup" className=" link">
                  SignUp
                </Link>
              </div>
              <button
                type="submit"
                className="submit"
                onClick={onSubmitHandler}
              >
                {load ? "Loading..." : "Login"}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default FormValidationWithoutYup;
