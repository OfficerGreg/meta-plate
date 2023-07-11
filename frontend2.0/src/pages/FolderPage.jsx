import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import { User, Folder, Note } from '../types';
import httpClient from '../httpClient';

const FolderPage = () => {
    const [user, setUser] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");
    const [newNoteNames, setNewNoteNames] = useState({});
    const [folderVisibility, setFolderVisibility] = useState({});

    const history = useHistory();

    const toggleNoteTable = (folderId) => {
        setFolderVisibility((prevState) => ({
            ...prevState,
            [folderId]: !prevState[folderId],
        }));
    };

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        history.push("/");
    };

    const createNote = async (folderId) => {
        try {
            await httpClient.post("//localhost:5000/note", {
                folder_id: folderId,
                name: newNoteNames[folderId] || "",
                text: " ",
            });

            await fetchUserData();
        } catch (error) {
            console.log("Error creating note:", error);
        }
    };

    const createFolder = async () => {
        try {
            await httpClient.post("//localhost:5000/folders", { name: newFolderName });

            await fetchUserData();
        } catch (error) {
            console.log("Error creating folder:", error);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await httpClient.get("//localhost:5000/@me");
            const userData = response.data;

            const foldersWithNotes = await Promise.all(
                userData.folders.map(async (folder) => {
                    const notesResponse = await httpClient.get(
                        `//localhost:5000/folders/${folder.id}/notes`
                    );
                    const notes = notesResponse.data;
                    folder.notes = notes;
                    return folder;
                })
            );

            setUser({
                ...userData,
                folders: foldersWithNotes,
            });
        } catch (error) {
            console.log("Not authenticated");
            history.push("/login");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleNoteNameChange = (folderId, value) => {
        setNewNoteNames((prevState) => ({
            ...prevState,
            [folderId]: value,
        }));
    };

    if (user === null) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <h2 className="page-header">Your Folders</h2>
            <div>
                <h3 style={{ marginBottom: '10px' }}>New Folder:</h3>
                <div className="topnav__search" style={{ width: '500px' }}>
                    <input
                        type="text"
                        placeholder="create here..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <i className="bx bx-add-to-queue" onClick={createFolder}></i>
                </div>
                <h2 style={{ marginTop: '60px', marginBottom:'10px' }}>Folders:</h2>
                <div className="row">
                    {user.folders.map((folder) => (
                        <div className="col-4">
                            <div className="card full-height" >
                                <React.Fragment key={folder.id}>
                                        <h1 onClick={() => toggleNoteTable(folder.id)}>{folder.name}</h1>

                                    {folder.notes && folder.notes.length >= 0 && folderVisibility[folder.id] && (
                                        <div>

                                            <h4 style={{ marginBottom: '10px' }}>New Note:</h4>
                                            <div className="topnav__search" style={{ width: '50%', height:"40px" }}>
                                                <input
                                                    type="text"
                                                    value={newNoteNames[folder.id] || ""}
                                                    onChange={(e) =>
                                                        handleNoteNameChange(folder.id, e.target.value)
                                                    }
                                                />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <i className="bx bx-add-to-queue" onClick={() => createNote(folder.id)} style={{ marginRight: "3px" }}></i>
                                                    <i className="bx bxs-file-import" onClick={() => alert("dont work yet")} style={{ marginRight: "3px" }}></i>
                                            </div>
                                            </div>
                                        <tr>
                                            <td colSpan={2}>
                                                <div className="row">
                                                {folder.notes.map((note) => (
                                                    <div style={{ padding:"3px",margin:"6px"}}>
                                                        <div  key={note.id} style={{ padding:"3px",marginBottom:"15px",borderRadius: "10px", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
                                                            <Link to={`/folders/${folder.id}/${note.id}`}>
                                                                {note.name}
                                                            </Link>
                                                        </div >
                                                    </div >
                                                ))}
                                                </div>
                                            </td>
                                        </tr>
                                        </div>
                                    )}
                                </React.Fragment>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FolderPage;
