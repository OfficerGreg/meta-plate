import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import httpClient from '../httpClient';

import UserProfileCard from "../components/userprofile-card/UserProfileCard";
import UserInfoCard from "../components/info-card/UserInfoCard";
import UserAccounts from "../components/info-card/UserAccounts";

const Userprofile = () => {
    const [user, setUser] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");
    const history = useHistory();

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        history.push("/");
    };

    const createFolder = async () => {
        try {
            await httpClient.post("//localhost:5000/folders", { name: newFolderName });
            // Refresh the user data to display the updated list of folders
            await fetchUserData();
        } catch (error) {
            console.log("Error creating folder:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await httpClient.get("//localhost:5000/@me");
            setUser(response.data);
        } catch (e) {
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
            <h2 className="page-header">Profile</h2>
            <div className="row">

                <div className="col-3" >
                <div className="card__body">
                <UserProfileCard user={user} logoutUser={logoutUser} />
                </div>
                </div>

                <div className="col-6">
                    <div className="card full-height">
                    <UserInfoCard user={user} />
                    </div>
                </div>


                <div className="col-3" >
                    <div className="card full-height">
                        <UserAccounts user={user} />
                    </div>
            </div>

            </div>
        </div>
    );
};

export default Userprofile;
