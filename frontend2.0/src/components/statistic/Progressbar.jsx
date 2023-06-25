import React from 'react';
import "./pogressbar.css";

const Progressbar = () => {
    return (
        <div className="container skills_container">
            <div className="description">
                <p>Hier ist deine durchschnittliche Bewertung der Noten und die Bewertung von Herrn Meier:</p>
            </div>
            <div className="bar">
                <div className="info">
                    <span>Java</span>
                </div>
                <div className="progress-line java">
                    <span></span>
                </div>
            </div>
            <div className="bar">
                <div className="info">
                    <span>C#</span>
                </div>
                <div className="progress-line c">
                    <span></span>
                </div>
            </div>
            <div className="bar">
                <div className="info">
                    <span>JavaScript</span>
                </div>
                <div className="progress-line javascript">
                    <span></span>
                </div>
            </div>
            <div className="bar">
                <div className="info">
                    <span>HTML, CSS</span>
                </div>
                <div className="progress-line html">
                    <span></span>
                </div>
            </div>
            <div className="bar">
                <div className="info">
                    <span>MySQL</span>
                </div>
                <div className="progress-line mysql">
                    <span></span>
                </div>
            </div>
            <div className="bar">
                <div className="info">
                    <span>Bash, PowerShell</span>
                </div>
                <div className="progress-line powershell">
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Progressbar;
