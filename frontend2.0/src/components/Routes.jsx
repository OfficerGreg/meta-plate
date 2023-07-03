import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Userprofile from "../pages/Userprofile";
import ApiTest from "../pages/ApiTest";
import NotePage from "../pages/NotePage";
import Workspace from "../pages/Workspace";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import FolderPage from "../pages/FolderPage";
//quiz
import Quiz from "../pages/quiz/Quiz";
import CreateQuiz from "../pages/quiz/CreateQuiz";
import EditQuiz from "../pages/quiz/EditQuiz";



const Routes = () => {
    return (
        <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/workspace" component={Workspace} />
            <Route path='/calendar' component={Customers}/>
            <Route path='/profile' component={Userprofile}/>
            <Route path='/completionChat' component={ApiTest}/>
            <Route path='/folders/:folderId/:noteId' component={NotePage}/>
            <Route path="/products" component={Products} />
            <Route path="/folders" component={FolderPage} />
            <Route path="/quiz/create" component={CreateQuiz} />
            <Route path="/quiz/:quizId/edit" component={EditQuiz} />
            <Route path="/quiz" component={Quiz} />
            <Route path="/*" component={NotFound} />
        </Switch>
    )
}

export default Routes
