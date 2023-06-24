import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


import httpClient from '../httpClient';

import Statistic from "../components/statistic/Statistic";
import Progressbar from "../components/statistic/Progressbar";
import { User } from '../types';
import UserProfileCard from "../components/userprofile-card/UserProfileCard";

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
            <h2 className="page-header">Dashboard</h2>
            <div className="row">
            <div className="card__body">
                <UserProfileCard user={user} logoutUser={logoutUser} />
            </div>

            <div className="box">
                <div className="info-card">
                    <div className="row">
                        <div className="text">
                            <h3>Full Name</h3>
                        </div>
                        <div className="info">
                            {user.username}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="text">
                            <h3>Email</h3>
                        </div>
                        <div className="info">
                            {user.email}
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="text">
                            <h3>Phone</h3>
                        </div>
                        <div className="info">
                            076 449 816 9029
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="text">
                            <h3>Password</h3>
                        </div>
                        <div className="info">
                            ****************
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-sm-12">
                            <a className="edit-btn" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box">
                <h3> Datenbanken </h3>
                <p>- MySQL</p>
                <p>- MongoDB</p>
                <p>- Redis</p>
            </div>

            <Progressbar />
            <Statistic />
            </div>
        </div>
    );
};

export default Userprofile;
