import React from 'react';
import { useParams } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
//import mermaid from "mermaid"; diagrams
import "katex/dist/katex.css";
import { getCodeString } from 'rehype-rewrite';
import katex from "katex";

import Switch from "@mui/material/Switch"

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

    const [theme, setTheme] = React.useState<string>("light");
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        setTheme(event.target.checked ? "dark" : "light");
    }


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
        <div style={{ marginTop: 50 }} className="container">
            <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />

            <h3>Note</h3>
            <div data-color-mode={theme}>
                <MDEditor
                    height={600}
                    value={value}
                    onChange={(newValue) => setValue(newValue!)}
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
            <button onClick={handleSave}>Save</button>
            <button>Export</button>
        </div>
    );
};

export default NotePage;
