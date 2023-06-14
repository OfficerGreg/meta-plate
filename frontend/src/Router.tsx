import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import Home from "./components/pages/home";
//import Note from "./components/pages/note";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import NotFound from "./components/pages/not_found";
import Dashboard from "./components/pages/dashboard";
import NotePage from "./components/pages/note_page";
import Settings from "./components/pages/settings";
import UserProfile from "./components/pages/UserProfile";
import ApiTest from "./components/pages/api_test"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/completionChat" element={<ApiTest />} />
        <Route path="/folders/:folderId/:noteId" element={<NotePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
