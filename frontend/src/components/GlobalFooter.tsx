import React from 'react'
import "../components/css/GlobalFooter.css"
import "./img/github.png"

const GlobalFooter: React.FC = () => {
    return(
        <footer className="footer-distributed">


            <div className="footer-right">

                <a href="#"><i className="fa fa-facebook"><img src="img/github.png" ></img> </i></a>
                <a href="#"><i className="fa fa-instergram"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-github"></i></a>

            </div>

            <div className="footer-left">

                <p className="footer-links">
                    <a className="link-1" href="#">Home</a>

                    <a href="#">Blog</a>

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