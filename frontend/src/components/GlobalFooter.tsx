import React from 'react'
import "../components/css/GlobalFooter.css"
import GitHub from "./svg/github-mark-white.svg"
import Google from "./svg/google.svg"
import Facebook from "./svg/facebook.svg"
import Instagram from "./svg/instagram.svg"

const GlobalFooter: React.FC = () => {
    return(
        <footer className="footer-distributed">


            <div className="footer-right">

                <a href="#"> <img src={Instagram} width="35"/></a>
                <a href="#"><img src={Facebook} width="35"/></a>
                <a href="#"><img src={Google} width="35"/></a>
                <a href="#"><img src={GitHub} width="35"/></a>

            </div>

            <div className="footer-left">

                <p className="footer-links">
                    <a className="link-1" href="#">Home</a>

                    <a href="#">Pricing</a>

                    <a href="#">About</a>

                    <a href="#">Faq</a>

                    <a href="#">Contact</a>
                </p>

                <p>Meta-Plate &copy; 2023</p>
            </div>

        </footer>

    )
};

export default GlobalFooter