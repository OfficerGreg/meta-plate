import React, { useState, useEffect } from 'react';
import '../css/home.css';
import httpClient from "../../httpClient";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const logInUser = async () => {
        console.log(username, password)

        try {
            const response = await httpClient.post("//localhost:5000/login", {
                username, password,
            });

            window.location.href = "/dashboard";
        } catch (e: any) {
            if (e.response.status === 401) {
                alert("Invalid credentials!")
            }
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        logInUser();
    };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "initial";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 3 && !isModalOpen) {
        openModal();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isModalOpen]);

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div>
      <div className="scroll-down">
        SCROLL DOWN
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path d="M16 3C8.832031 3 3 8.832031 3 16s5.832031 13 13 13 13-5.832031 13-13S23.167969 3 16 3zm0 2c6.085938 0 11 4.914063 11 11 0 6.085938-4.914062 11-11 11-6.085937 0-11-4.914062-11-11C5 9.914063 9.914063 5 16 5zm-1 4v10.28125l-4-4-1.40625 1.4375L16 23.125l6.40625-6.40625L21 15.28125l-4 4V9z" />
        </svg>
      </div>

      <video className="container-home" muted={true} loop={true} autoPlay={true} src="//cdn.shopify.com/s/files/1/0526/6905/5172/t/5/assets/footer.mp4?v=29581141968431347981633714450"></video>

      {isModalOpen && (
        <div className="modal is-open">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">Welcome!</h1>
              <p className="modal-desc">This is the perfect place to learn and improve faster. Let's embark on an exciting journey of knowledge and growth together!</p>
               <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="email" className="input-label">Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} id=""></input>
              </div>

              <div className="input-block">
                <label htmlFor="password" className="input-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id=""></input>
              </div>

              <div className="modal-buttons">
                <a href="" className="">Forgot your password?</a>
                <button className="input-button" type="submit">Login</button>
              </div>
              </form>
              <p className="sign-up">Don't have an account? <a href="/register">sign up now</a></p>
            </div>


            <div className="modal-right">
              <video className="background" muted={true} loop={true} autoPlay={true} src="//cdn.shopify.com/s/files/1/0526/6905/5172/t/5/assets/footer.mp4?v=29581141968431347981633714450"></video>
            </div>
            <button className="icon-button close-button" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path d="M 25 3 C 12.86158 3 3 12.86158 3 25 C 3 37.13842 12.86158 47 25 47 C 37.13842 47 47 37.13842 47 25 C 47 12.86158 37.13842 3 25 3 z M 25 5 C 36.05754 5 45 13.94246 45 25 C 45 36.05754 36.05754 45 25 45 C 13.94246 45 5 36.05754 5 25 C 5 13.94246 13.94246 5 25 5 z M 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.980469 15.990234 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <div className="modal">
          <button className="modal-button" onClick={openModal}>Click here to login</button>
        </div>
      )}
    </div>
  );
};

export default Home;