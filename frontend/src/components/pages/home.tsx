import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../css/home.css';
import welcomeImage from '../img/hintergrund.png';

const Home: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const containerPosition = containerRef.current.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.5;

                if (containerPosition < screenPosition) {
                    containerRef.current.classList.add('show');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section>
            <div className="home" ref={containerRef}>
                <h1>Welcome to Meta Plate!</h1>
                <div className="buttons">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </section>
    );
};

export default Home;
