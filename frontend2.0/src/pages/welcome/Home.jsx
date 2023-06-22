import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const containerRef = useRef(null);
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);
  }, []);

  return (
    <section>
      {showComponent && (
        <div className="home" ref={containerRef}>
          <h1>Welcome to Meta Plate!</h1>
          <div className="buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
