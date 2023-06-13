import React from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';

import '../css/note.css';
import httpClient from '../../httpClient';

interface NotePageParams {
  folderId: string;
  noteId: string;
  [key: string]: string | undefined;
}

const NotePage: React.FC = () => {
  const { folderId, noteId } = useParams<NotePageParams>();
  const [value, setValue] = React.useState<string | undefined>('');

  React.useEffect(() => {
    const fetchNoteData = async () => {
      try {
        const response = await httpClient.get(
          `//localhost:5000/folders/${folderId}/notes/${noteId}/text`
        );
        const noteData = response.data;
        setValue(noteData.text);
      } catch (error) {
        console.log("Error fetching note data:", error);
      }
    };
    fetchNoteData();
  }, [folderId, noteId]);

  const handleSave = async () => {
    try {
      await httpClient.put(`//localhost:5000/folders/${folderId}/notes/${noteId}`, {
        text: value,
      });
      console.log("Note saved successfully");
    } catch (error) {
      console.log("Error saving note:", error);
    }
  };

  return (
    <div style={{ marginTop: 200 }} className="container">
      <h3>Note</h3>
      <div data-color-mode="light">
        <MDEditor height={600} value={value} onChange={setValue} />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NotePage;
