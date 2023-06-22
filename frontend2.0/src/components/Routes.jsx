import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
    return (
        <Switch>

            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path='/customers' component={Customers}/>


        </Switch>
    )
}

export default Routes
