import React, { useState } from 'react';
import httpClient from '../../httpClient';
import Button from 'react-bootstrap/Button';
import './Register.css';
import Navbar from "./Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    // debug
    console.log(username, email, password);

    try {
      const response = await httpClient.post("//localhost:5000/register", {
        username, email, password
      });

      window.location.href = "/dashboard";
    } catch (e) {
      if (e.response.status === 401) {
        alert("Invalid credentials!");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    registerUser();
  };

  return (
    <section className="register-section">
      <Navbar/>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username" className="label">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" />
        </div>
        <Button type="submit" className="btn-primary">Submit</Button>
        <a href="/login" className="a-link">Already have an account?</a>
      </form>
    </section>
  );
};

export default Register;
