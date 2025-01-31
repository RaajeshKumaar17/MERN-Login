import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login  () {
     const [email,setEmail]=useState();
     const [password,setPassword]=useState();
     const Navigate=useNavigate()

     const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/login',{email,password})
        .then(result=>{
            console.log(result)
        if(result.data==="Success"){
            Navigate("/home")
        }
        })
        
        
        .catch(err=>{
            console.log(err)
    })
    }


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <br />
        <Link to="/register" className="btn btn-secondary">
          Back To Registration
        </Link>
      </div>
    </div>
               
           
  )
}

export default Login