import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
//import mermaid from "mermaid"; diagrams
import "katex/dist/katex.css";
import { getCodeString } from 'rehype-rewrite';
import katex from "katex";

import Switch from "@mui/material/Switch"

import httpClient from '../httpClient';
import ActionButtons from "../components/action/ActionButton";

const NotePage = () => {
  const { folderId, noteId } = useParams();
  const [value, setValue] = useState('Initializing');

  const [theme, setTheme] = useState("light");
  const [checked, setChecked] = useState(true);

  //sse
  const [data, setData] = useState('Initializing');
  const [eventSource, setEventSource] = useState(null);
  let [question, setQuestion] = useState('');

  const handleStream = (e) => {
    console.log(e);
    const newData = e.data.trim();
    setData(prevData => prevData + newData);
    if (newData) {
      setValue(prevValue => {
        const marker = '#!';
        const markerIndex = prevValue?.indexOf(marker) ?? -1;
        if (markerIndex !== -1) {
          const beforeMarker = prevValue?.substring(0, markerIndex) ?? '';
          return beforeMarker + ' ' + newData;
        } else {
          return (prevValue ?? '') + ' ' + newData;
        }
      });
    }
  };
  


  const startSSE = () => {
    if (question) {
      question = "This is my note so far. [" + value + "] Your task: " + question
      fetch('//localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ question }),
      })
        .then(response => {
          if (response.ok) {
            const newEventSource = new EventSource('//localhost:5000/stream');
            newEventSource.onmessage = handleStream;
            newEventSource.onerror = () => {
              newEventSource.close();
            }
            setEventSource(newEventSource);
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }


  const stopSSE = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
    }
  }

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  }

  //sse end


  const handleChange = (event) => {
    setChecked(event.target.checked);
    setTheme(event.target.checked ? "light" : "dark");
  }


  useEffect(() => {
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

  const handleExport = async () => {
    const fileContent = value || "";
    const file = new Blob([fileContent], { type: "text/plain" });
    const fileURL = URL.createObjectURL(file);
    const element = document.createElement("a");

    element.href = fileURL;
    element.download = "test.md";
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(fileURL);

  }

  return (
    <div>
      <h2 className="page-header">Note</h2>
      <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
      />

      <div className="row">
      <div data-color-mode={theme} className="col-12">
        <MDEditor
          height={600}
          value={value}
          onChange={(newValue) => setValue(newValue)}
          textareaProps={{
            placeholder: 'Please enter Markdown text',
          }}
          previewOptions={{
            components: {
              code: ({ inline, children = [], className, ...props }) => {
                const txt = children[0] || '';
                if (inline) {
                  if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                    const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                      throwOnError: false,
                    });
                    return <code dangerouslySetInnerHTML={{ __html: html }} />;
                  }
                  return <code>{txt}</code>;
                }
                const code = props.node && props.node.children ? getCodeString(props.node.children) : txt;
                if (
                  typeof code === 'string' &&
                  typeof className === 'string' &&
                  /^language-katex/.test(className.toLocaleLowerCase())
                ) {
                  const html = katex.renderToString(code, {
                    throwOnError: false,
                  });
                  return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
                }
                return <code className={String(className)}>{txt}</code>;
              },
            },
          }}
        />
      </div>
      </div>
      <ActionButtons
          handleSave={handleSave}
          handleExport={handleExport}
          question={question}
          handleQuestionChange={handleQuestionChange}
          startSSE={startSSE}
          stopSSE={stopSSE}
      />
    </div>
  );
};

export default NotePage;
