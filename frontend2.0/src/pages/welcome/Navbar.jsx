import React, { useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    useEffect(() => {
        const openMobileNavbar = () => {
            navbar?.classList.add('opened');
            navbarToggle?.setAttribute('aria-expanded', 'true');
        };

        const closeMobileNavbar = () => {
            navbar?.classList.remove('opened');
            navbarToggle?.setAttribute('aria-expanded', 'false');
        };

        const handleToggleClick = () => {
            if (navbar?.classList.contains('opened')) {
                closeMobileNavbar();
            } else {
                openMobileNavbar();
            }
        };

        const navbar = document.getElementById('navbar');
        const navbarToggle = navbar?.querySelector('.navbar-toggle');

        const navbarLinksContainer = navbar?.querySelector('.navbar-links');
        navbarLinksContainer?.addEventListener('click', (clickEvent) => {
            clickEvent.stopPropagation();
        });

        const navbarMenu = navbar?.querySelector('#navbar-menu');
        navbarMenu?.addEventListener('click', closeMobileNavbar);

        const options = document.getElementById('options');
        const navTypeInputs = options?.querySelectorAll("input[name='navtype']");
        navTypeInputs?.forEach((option) => {
            option.addEventListener('change', (e) => {
                const target = e.target;
                const navType = target.id.split('-').join(' ');
                navbarMenu?.classList.add(navType);
            });
        });

        navbarToggle?.addEventListener('click', handleToggleClick);

        return () => {
            navbarToggle?.removeEventListener('click', handleToggleClick);
            navbarLinksContainer?.removeEventListener('click', (clickEvent) => {
                clickEvent.stopPropagation();
            });
            navbarMenu?.removeEventListener('click', closeMobileNavbar);
            navTypeInputs?.forEach((option) => {
                option.removeEventListener('change', (e) => {
                    const target = e.target;
                    const navType = target.id.split('-').join(' ');
                    navbarMenu?.classList.add(navType);
                });
            });
        };
    }, []);

    return (
        <header id="navbar">
            <nav className="navbar-container container">
                <a href="/dashboard" className="home-link">
                     <img className="navbar-logo" src={process.env.PUBLIC_URL + '/logo.png'} alt="logo"/>
                    Meta-Plate
                </a>
                <button
                    type="button"
                    className="navbar-toggle"
                    aria-label="Toggle menu"
                    aria-expanded="false"
                    aria-controls="navbar-menu"
                >
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <div id="navbar-menu" className="detached">
                    <ul className="navbar-links">
                        <li className="navbar-item">
                            <a className="navbar-link" href="/">
                                Home
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="/dashboard">
                                Learn
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="/blog">
                                Blog
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="/help">
                                Help
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="/login">
                                Login
                            </a>
                        </li>
                        <li className="navbar-item">
                            <a className="navbar-link" href="/register">
                                Register
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
