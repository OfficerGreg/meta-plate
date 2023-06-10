import React, { useEffect } from 'react';
import '../components/css/GlobalNavbar.css';
import User from "./img/user.png";
import Vbucks from "./img/vbucks.png";
const GlobalNavbar: React.FC = () => {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const navbarToggle = navbar?.querySelector('.navbar-toggle');

    function openMobileNavbar() {
      navbar?.classList.add('opened');
      navbarToggle?.setAttribute('aria-expanded', 'true');
    }

    function closeMobileNavbar() {
      navbar?.classList.remove('opened');
      navbarToggle?.setAttribute('aria-expanded', 'false');
    }

    function handleToggleClick() {
      if (navbar?.classList.contains('opened')) {
        closeMobileNavbar();
      } else {
        openMobileNavbar();
      }
    }

    const navbarLinksContainer = navbar?.querySelector('.navbar-links');
    navbarLinksContainer?.addEventListener('click', (clickEvent) => {
      clickEvent.stopPropagation();
    });

    const navbarMenu = navbar?.querySelector('#navbar-menu');
    navbarMenu?.addEventListener('click', closeMobileNavbar);

    const options = document.getElementById('options');
    const navTypeInputs = options?.querySelectorAll<HTMLInputElement>("input[name='navtype']");
    navTypeInputs?.forEach((option) => {
      option.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
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
        option.removeEventListener('change', (e: Event) => {
          const target = e.target as HTMLInputElement;
          const navType = target.id.split('-').join(' ');
          navbarMenu?.classList.add(navType);
        });
      });
    };
  }, []);

  return (
    <header id="navbar">
      <nav className="navbar-container container">
        <a href="/" className="home-link">
          <div className="navbar-logo"></div>
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
              <a className="navbar-link" href="/about">
                About
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/blog">
                Blog
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/careers">
                Careers
              </a>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="/contact">
                Contact
              </a>
            </li>
             <li className="navbar-coin">
                <img  src={Vbucks} alt="coind" width="25" />
            </li>

            <li className="navbar-user">
                <img  src={User} alt="user" width="30" />
            </li>
          </ul>

        </div>
      </nav>
    </header>
  );
};

export default GlobalNavbar;
