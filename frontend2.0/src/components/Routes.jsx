import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path='/customers' component={Customers}/>
            <Route path="/settings" component={Settings} />
            <Route path="/user" component={UserProfile} />
            <Route path="/completionChat" component={ApiTest} />
            <Route path="/folders/:folderId/:noteId" component={NotePage} />
            <Route path="*" component={NotFound} />

        </Switch>
    )
}

export default Routes
