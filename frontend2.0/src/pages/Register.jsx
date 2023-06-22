import React, { useState } from 'react';
import httpClient from '../httpClient';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {
        //debug
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
        <section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="register-username-input">
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id="" />
                </div>
                <div className="register-email-input">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="" />
                </div>
                <div className="register-password-input">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="" />
                </div>
                <button type="submit">Submit</button>
                <a href="/Login.jsx">Already have an account?</a>
            </form>
        </section>
    );
};
export default Register;
