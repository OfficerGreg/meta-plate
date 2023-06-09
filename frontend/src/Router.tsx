import {BrowserRouter, Routes, Route} from "react-router-dom"
import React from 'react'

import Home from "./components/pages/home"
import Login from "./components/pages/login"
import Register from "./components/pages/register"
import NotFound from "./components/pages/not_found"
import Dashboard from "./components/pages/dashboard"

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/login" Component={Login}/>
            <Route path="/register" Component={Register}/>
            <Route path="/dashboard" Component={Dashboard}/>
            <Route Component={NotFound}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router