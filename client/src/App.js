import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css"
import "./css/sidemenu.css"



import Login from "./components/Login.js"
import SignIn from "./components/SignIn.js"
import Main from "./components/Main.js"
import SignInCompany from "./components/SignInCompany.js"

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
                    <Route exact path="/Main" component={Main} />
                    <Route path="*" component={Login}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}