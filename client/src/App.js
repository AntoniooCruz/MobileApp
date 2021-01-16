import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css"
import "./css/sidemenu.css"

//const SERVER_HOST = `http://virtserver.swaggerhub.com/AntonioCruz/MobileAPP/1.0.0`

import Login from "./components/Login.js"
import SignIn from "./components/SignIn.js"
import Main from "./components/Main.js"
import MainCompany from "./components/MainCompany.js"
import SignInCompany from "./components/SignInCompany.js"
import PrivateRoute from "./components/PrivateRoute"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.user_id = ""
    localStorage.username = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
}

export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>           
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Login" component={Login} />
                    <Route exact path="/SignIn" component={SignIn} />
                    <Route exact path="/SignInCompany" component={SignInCompany} />
                    <PrivateRoute exact path="/Main" component={Main}/>
                    <PrivateRoute exact path="/MainCompany" component={MainCompany} />
                    <Route path="*" component={Login}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}