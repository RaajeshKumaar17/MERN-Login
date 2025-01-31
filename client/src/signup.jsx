import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; 
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
        setMessage("All fields are required.");
        return;
      }

    axios
      .post("http://localhost:3000/register", { name, email, password })
      .then((result) => {
        setMessage("Registration Successful! Please log in.");
        setTimeout(() => {
          navigate("/login"); 
        }, 1500);
      })
      .catch((err) => {
        if (err.response && err.response.data.message === "Email already exists") {
            setMessage("Email already exists. Please use a different email.");
          } else {
            setMessage("Registration failed. Please try again.");
          }
      });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Register</h2>
        {message && (
          <div className={`alert ${message.includes("Successful") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Register
          </button>
        </form>
        <p>Already Have an Account?</p>
        <Link to="/login" className="btn btn-secondary">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
