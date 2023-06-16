import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import httpClient from '../../httpClient';

const Settings: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await httpClient.get("//localhost:5000/@me");
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.log("Not authenticated");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (user === null) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <h1>User Information:</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
    </section>
  );
};

export default Settings;
