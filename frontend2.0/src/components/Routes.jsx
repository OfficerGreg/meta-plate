import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Userprofile from "../pages/Userprofile";


const Routes = () => {
    return (
        <Switch>



            <Route path="/dashboard" component={Dashboard} />
            <Route path='/customers' component={Customers}/>
            <Route path='/profile' component={Userprofile}/>


        </Switch>
    )
}

export default Routes
