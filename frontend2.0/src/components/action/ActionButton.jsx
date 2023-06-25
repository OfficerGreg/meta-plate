import React from 'react';
import './actionButtons.css';

const ActionButtons = ({
                           handleSave,
                           handleExport,
                           question,
                           handleQuestionChange,
                           startSSE,
                           stopSSE
                       }) => {
    return (
        <div className="action-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleExport}>Export</button>
            <input type="text" value={question} onChange={handleQuestionChange} />
            <button onClick={startSSE}>Generate</button>
            <button onClick={stopSSE}>Stop</button>
        </div>
    );
};

export default ActionButtons;
