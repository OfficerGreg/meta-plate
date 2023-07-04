import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
import Navbar from "./Navbar";

const Home = () => {
    const containerRef = useRef(null);
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        setShowComponent(true);
    }, []);

    return (
        <div>
            <section style={{ width: 'auto', height: '100vh' }}>
                <Navbar />
                {showComponent && (
                    <div className="home-container" ref={containerRef}>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" style={{ width: '300px', height: 'auto', marginBottom: '40px' }} />
                        <h1 className="home-heading">Welcome to Meta Plate!</h1>
                        <div className="home-buttons">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                )}
            </section>
            <div className="newsSection" style={{ width: 'auto', height: '100vh' }}>
                <h1 className="header-center">What is Meta-Plate?</h1>
                <section>
                    <div className="text-image-section">
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" style={{ width: '300px', height: 'auto' }} />
                        <p style={{ marginLeft: '30px' }}>Meta-Plate is an innovative learning application that utilizes competitive learning strategies to engage students and reward their progress. With Meta-Plate, students can immerse themselves in a dynamic learning environment that encourages active participation and motivates them to achieve their academic goals. Through a combination of interactive lessons, quizzes, and challenges, Meta-Plate fosters a competitive spirit among students, driving them to excel and earn rewards along the way. Discover a new way of learning with Meta-Plate!</p>
                    </div>
                </section>
                <section>
                    <div className="text-image-section">
                        <p style={{ marginLeft: '30px' }}>Meta-Plate ist eine innovative Lernanwendung, die auf Wettbewerbsstrategien setzt, um Schülerinnen und Schüler einzubeziehen und ihren Fortschritt zu belohnen. Mit Meta-Plate können sich die Schülerinnen und Schüler in einer dynamischen Lernumgebung engagieren, die aktive Teilnahme fördert und sie dazu motiviert, ihre schulischen Ziele zu erreichen. Durch interaktive Lektionen, Quizze und Herausforderungen fördert Meta-Plate einen wettbewerbsorientierten Geist unter den Schülern, der sie dazu antreibt, sich zu verbessern und dabei Belohnungen zu verdienen. Entdecken Sie eine neue Art des Lernens mit Meta-Plate!</p>
                        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" style={{ width: '300px', height: 'auto' }} />
                    </div>
                </section>
                <h1 className="header-center">Start now, Create an Account!</h1>
            </div>
        </div>

    );
};

export default Home;
