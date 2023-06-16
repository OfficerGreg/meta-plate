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
    <section>
        <div className="container">
            <h1>Welcome to Meta Plate!</h1>
            <div className="buttons">
                <a href="{{url_for('login')}}">Login</a>
                <a href="{{url_for('register')}}">Register</a>
            </div>
        </div>
    </section>
  );
};

export default Home;