import React, { useState } from 'react';
import httpClient from '../../httpClient';
import Button from 'react-bootstrap/Button';
import './Login.css';

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
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" />
        </div>
        <Button type="submit" className="btn-primary">Submit</Button>
        <a href="/register">Don't have an account?</a>
      </form>
    </section>
  );
};

export default Login;
