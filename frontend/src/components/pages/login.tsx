import React, { useState } from 'react'
import httpClient from '../../httpClient';

import "../css/login.css"

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () => {
        console.log(username, password)


        try{
            const response = await httpClient.post("//localhost:5000/login", {
                username, password,
            });

            window.location.href = "/dashboard";
        }catch(e : any){
            if(e.response.status === 401){
                alert("Invalid credentials!")
            }


        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div className="login-username-input">
                    <label>Username  </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id=""></input>
                </div>
                <div className="login-password-input">
                    <label>Password  </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id=""></input>
                </div>
                <button type="button" onClick={() => logInUser()}>Submit</button>
            </form>

        </div>
    );
};

export default Login