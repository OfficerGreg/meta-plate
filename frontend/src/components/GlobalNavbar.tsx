import React from 'react'
import "../components/css/GlobalNavbar.css"


const GlobalNavbar: React.FC = () => {
    return(

          <header id="navbar">
    <nav className="navbar-container container">
        <a href="/" className="home-link">
        <div className="navbar-logo"></div>
        Meta-Plate
      </a>
      <button type="button" className="navbar-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navbar-menu">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
      </button>
      <div id="navbar-menu" className="detached">
        <ul className="navbar-links">
          <li className="navbar-item"><a className="navbar-link" href="/about">About</a></li>
          <li className="navbar-item"><a className="navbar-link" href="/blog">Blog</a></li>
          <li className="navbar-item"><a className="navbar-link" href="/careers">Careers</a></li>
          <li className="navbar-item"><a className="navbar-link" href="/contact">Contact</a></li>
        </ul>
      </div>
    </nav>
</header>

    )
};

export default GlobalNavbar