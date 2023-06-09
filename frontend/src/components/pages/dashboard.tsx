import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/dashboard.css";
import { User } from '../../types';
import httpClient from '../../httpClient';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const logoutUser = async () => {
        const response = await httpClient.post("//localhost:5000/logout");
        navigate("/");
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get("//localhost:5000/@me");

                setUser(response.data);
            } catch (e) {
                console.log("Not authenticated");
                navigate("/login");
            }
        })();
    }, [navigate])

    if (user === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h1>Logged In</h1>
            <br/>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default Dashboard;
