import React, { useState } from 'react';
import httpClient from '../httpClient';

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
        <section>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-username-input">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="" />
                </div>
                <div className="login-password-input">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="" />
                </div>
                <button type="submit">Submit</button>
                <a href="/Register.jsx">Don't have an account?</a>
            </form>
        </section>
    );
};

export default Login;
