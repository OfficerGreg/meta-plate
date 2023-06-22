import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { User } from '../types';
import httpClient from '../httpClient';

import Statistic from "../components/statistic/Statistic";
import Progressbar from "../components/statistic/Progressbar";

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
        <div className="box-container-skills">
            <div className="box">
                <div className="profile">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                    <div className="">
                        <h4>{user.username}</h4>
                        <h4>ID:# {user.id}</h4>
                        <p className="text-secondary mb-1"> Student Application Developer</p>
                        <p className="text-muted font-size-sm">WISS Altstetten, ZH</p>
                        <button onClick={logoutUser}>Logout</button>
                    </div>
                </div>
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
    );
};

export default Userprofile;
