import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import "../css/fileExplorer.css";
import { User, Folder, Note } from '../../types';
import httpClient from '../../httpClient';


const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [newNoteNames, setNewNoteNames] = useState<{ [key: number]: string }>({});
  const [isDeletingNote, setIsDeletingNote] = useState(false);

  const navigate = useNavigate();

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    navigate("/");
  };

  const createNote = async (folderId: number) => {
    try {
      await httpClient.post("//localhost:5000/note", {
        folder_id: folderId,
        name: newNoteNames[folderId] || "",
        text: "testing this func ",
      });
      // Refresh the user data to display the updated list of notes
      await fetchUserData();
    } catch (error) {
      console.log("Error creating note:", error);
    }
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
      <section className="faqs" id="soft-skills">

          <h2 className="border_bottom">M127
          </h2>
          <div className="information">
              <p>note</p>
              <p>note</p>
              <p>note</p>
          </div>
          <div className="container faqs_container">

              <article className="faq">
                  <div className="faq_icon">
                      <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="question_ans">
                      <h4>M495</h4>
                      <p>note</p>
                      <p>note</p>
                      <p>note</p>
                  </div>
              </article>
              <article className="faq">
                  <div className="faq_icon">
                      <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="question_ans">
                      <h4>M235</h4>
                      <p>note</p>
                      <p>note</p>
                      <p>note</p>
                  </div>
              </article>
              <article className="faq">
                  <div className="faq_icon">
                      <i className="fa-solid fa-plus"></i>
                  </div>
                  <div className="question_ans">
                      <h4>M112</h4>
                     <p>note</p>
                      <p>note</p>
                      <p>note</p>
                  </div>
              </article>
          </div>
      </section>
  );

};

export default Dashboard;
