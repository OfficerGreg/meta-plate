import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import "../css/dashboard.css";
import { User, Folder, Note } from '../../types';
import httpClient from '../../httpClient';


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newNoteNames, setNewNoteNames] = useState<{ [key: number]: string }>({});

  const [folderVisibility, setFolderVisibility] = useState<{ [key: number]: boolean }>({});


  const navigate = useNavigate();



  const toggleNoteTable = (folderId: number) => {
    setFolderVisibility((prevState) => ({
      ...prevState,
      [folderId]: !prevState[folderId],
    }));
  };

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    navigate("/");
  };

  const createNote = async (folderId: number) => {
    try {
      await httpClient.post("//localhost:5000/note", {
        folder_id: folderId,
        name: newNoteNames[folderId] || "",
        text: " ",
      });
      // Refresh the user data to display the updated list of notes
      await fetchUserData();
    } catch (error) {
      console.log("Error creating note:", error);
    }
  };
  //TODO delete Note

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
      const userData = response.data;

      const foldersWithNotes = await Promise.all(
        userData.folders.map(async (folder: Folder) => {
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
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleNoteNameChange = (folderId: number, value: string) => {
    setNewNoteNames((prevState) => ({
      ...prevState,
      [folderId]: value,
    }));
  };

  if (user === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="section">
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
        <table style={{ width: "100%" }}>
        <tbody>
          {user.folders.map((folder) => (
            <React.Fragment key={folder.id}>
              <tr style={{ backgroundColor: "red" }}>
                <td>{folder.name}</td>
                <td>
                  <div>
                    <label>New Note:</label>
                    <input
                      type="text"
                      value={newNoteNames[folder.id] || ""}
                      onChange={(e) =>
                        handleNoteNameChange(folder.id, e.target.value)
                      }
                    />
                    <button onClick={() => createNote(folder.id)}>
                      Create Note
                    </button>
                    <button onClick={() => toggleNoteTable(folder.id)}>
                      {folderVisibility[folder.id] ? "Hide" : "Show"}
                    </button>
                    <button onClick={() => alert("dont work yet")}>
                      Import Note
                    </button>
                  </div>
                </td>
              </tr>
              {folder.notes && folder.notes.length > 0 && folderVisibility[folder.id] && (
                <tr>
                  <td style={{ backgroundColor: "gray" }} colSpan={2}>
                    {folder.notes.map((note) => (
                      <tr key={note.id}>
                        <td>
                          <Link to={`/folders/${folder.id}/${note.id}`}>
                            {note.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );

};

export default Dashboard;
