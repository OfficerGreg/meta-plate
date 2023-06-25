import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Home from "./components/pages/home";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import NotFound from "./components/pages/not_found";
import Dashboard from "./components/pages/dashboard";
import Grades from "./components/pages/grades";
import NotePage from "./components/pages/note_page";
import UserProfile from "./components/pages/UserProfile";
import Calendar from "react-calendar";
import Gamba from "./components/pages/gamba"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/grades" element={<Grades />} />        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/gamba" element={<Gamba />} />
        <Route path="/folders/:folderId/:noteId" element={<NotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
