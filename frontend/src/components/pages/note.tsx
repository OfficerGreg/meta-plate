import React, { useEffect } from 'react'
import MDEditor, { selectWord } from "@uiw/react-md-editor";

import "../css/note.css"

const defualtMsg = ` 
# h1 hello world
## h2 hello world
### h3 hello world
`;


const Note: React.FC = () => {

    
    const [value, setValue] = React.useState<string | undefined>(defualtMsg);

    return (
        <div className="container">
            <h3>Note</h3>
            <div data-color-mode="light">
                <MDEditor height={600} value={value} onChange={setValue} />
            </div>
        </div>
    )
};

export default Note