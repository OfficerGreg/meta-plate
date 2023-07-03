import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { User, Folder, Note } from '../../types';
import httpClient from '../../httpClient';
import StatusCard from '../../components/status-card/StatusCard'
import statusCards from '../../assets/JsonData/status-card-data.json'



const Quiz = () => {
    const [user, setUser] = useState(null);
    const history = useHistory();

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        history.push("/");
    };


    const fetchUserData = async () => {
        try {
            const response = await httpClient.get("//localhost:5000/@me");
            const userData = response.data;
            setUser(userData);

        } catch (error) {
            console.log("Not authenticated");
            history.push("/login");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    if (user === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h2 className="page-header">Quiz</h2>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        {
                            statusCards.map((item, index) => (
                                <div className="col-6" key={index}>

                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}

                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
