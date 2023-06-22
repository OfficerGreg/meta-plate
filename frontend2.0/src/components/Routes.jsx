import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Userprofile from "../pages/Userprofile";
import ApiTest from "../pages/ApiTest";
import NotePage from "../pages/NotePage";


const Routes = () => {
    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path='/customers' component={Customers}/>
            <Route path='/profile' component={Userprofile}/>
            <Route path='/completionChat' component={ApiTest}/>
            <Route path='//folders/:folderId/:noteId' component={NotePage}/>
        </Switch>
    )
}

export default Routes
