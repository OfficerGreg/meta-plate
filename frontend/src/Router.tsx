import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Home from "./components/pages/home";
//import Note from "./components/pages/note";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import NotFound from "./components/pages/not_found";
import Dashboard from "./components/pages/dashboard";
import NotePage from "./components/pages/note_page";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/folders/:folderId/:noteId" element={<NotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
