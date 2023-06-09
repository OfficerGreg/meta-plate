import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../css/dashboard.css";
import { User } from '../../types';
import httpClient from '../../httpClient';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [newFolderName, setNewFolderName] = useState("");
    const navigate = useNavigate();

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        navigate("/");
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
            navigate("/login");
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
            <h1>Logged In</h1>
            <p>User ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <br />
            <button onClick={logoutUser}>Logout</button>
            <div>
                <div>
                    <label>New Folder:</label>
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <button onClick={createFolder}>Create Folder</button>
                </div>
                <p>Folders:</p>
                <table>
                    <tbody>
                        {user.folders.map((folder) => (
                            <tr style={{backgroundColor: "red"}} key={folder.id}>
                                <td>{folder.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Dashboard;
