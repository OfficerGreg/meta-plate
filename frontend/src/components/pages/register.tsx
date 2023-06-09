import React, { useState } from 'react'
import httpClient from '../../httpClient';

import "../css/register.css"

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const registerUser = async () => {
        //debug
        console.log(username, email, password)

        try {
            const response = await httpClient.post("//localhost:5000/register", {
                username, email, password
            });

            window.location.href = "/dashboard";
        } catch (e: any) {
            if (e.response.status === 401) {
                alert("Invalid credentials!")
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        registerUser();
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="register-username-input">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id=""></input>
                </div>
                <div className="register-email-input">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id=""></input>
                </div>
                <div className="register-password-input">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id=""></input>
                </div>
                <button type="submit">Submit</button>
                <a href="/login">already have an account?</a>
            </form>

        </div>
    );
};

export default Register;
