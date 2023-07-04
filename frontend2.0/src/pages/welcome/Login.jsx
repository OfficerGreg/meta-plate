import React, { useState } from 'react';
import httpClient from '../../httpClient';
import Button from 'react-bootstrap/Button';
import './Login.css';
import Navbar from "./Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    console.log(username, password);

    try {
      const response = await httpClient.post("//localhost:5000/login", {
        username, password,
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
    logInUser();
  };

  return (
    <section className="login-section">
      <Navbar/>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="label">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" />
        </div>
        <Button type="submit" className="btn-primary">Submit</Button>
        <a href="/register" className="a-link">Don't have an account?</a>
      </form>
    </section>
  );
};

export default Login;
