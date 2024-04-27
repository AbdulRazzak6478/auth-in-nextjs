'use client';
import React, { useState } from "react";
import "../../styles/signup.css";
import Link from "next/link";

const FormValidationWithoutYup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({ 
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e:any) => {
    console.log(
      "events, name : ",
      e.target.name,
      " , value : ",
      e.target.value
    );
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email:any) => {
    // regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  const isValidPassword = (password : any) => {
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
    let newErrors :any = {};
    if (!formData.username) {
      newErrors.username = "First name is required";
    }
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

  const onSubmitHandler = (e:any) => {
    e.preventDefault();
    const isValid = validateFormWithOutYup();
    if (isValid) {
      console.log("form is submitted ", formData);
    } else {
      console.log("Form Validation is Failed");
    }
    // console.log('form data : ',formData);
  };
  return (
    <>
      <div className="form-container">
        <h2>Sign Up</h2>
        <form action="">
          <div className="field">
            <label htmlFor="">User Name* :</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Your User Name ..."
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
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
          {errors.password && <div className="error">{errors.password}</div>}
          <div className="direct">
            <Link href="#" className="forget link">Forgot Password</Link>
            <Link href="/login" className=" link">Login</Link>
          </div>
          <button type="submit" className="submit" onClick={onSubmitHandler}>
            SignUp
          </button>
        </form>
      </div>
    </>
  );
};

export default FormValidationWithoutYup;
