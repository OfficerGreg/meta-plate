import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'

import Home from "./components/pages/home"
import Note from "./components/pages/note"
import Login from "./components/pages/login"
import Register from "./components/pages/register"
import NotFound from "./components/pages/not_found"
import Dashboard from "./components/pages/dashboard"
import UserProfile from "./components/pages/UserProfile";
import Progressbar from "./components/Progressbar";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/login" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/dashboard" Component={Dashboard}/>
            <Route path="/note" Component={Note}/>
            <Route path="/user" Component={UserProfile}/>
            <Route Component={NotFound}/>
            <Route path="/progress" Component={Progressbar}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router