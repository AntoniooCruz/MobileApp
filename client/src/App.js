import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./css/App.css"
import "./css/sidemenu.css"

//const SERVER_HOST = `http://virtserver.swaggerhub.com/AntonioCruz/MobileAPP/1.0.0`

import Login from "./components/Login.js"
import SignIn from "./components/users/SignIn.js"
import DisplayAllCompanies from "./components/users/DisplayAllCompanies.js"
import SignInCompany from "./components/companies/SignInCompany.js"
import DisplayAllProducts from "./components/users/DisplayAllProducts.js"
import PrivateRoute from "./components/PrivateRoute.js"
import PersonalProfile from "./components/users/PersonalProfile.js"
import Logout from "./components/Logout.js"
import Orders from "./components/users/Orders.js"
import OrdersCompany from "./components/companies/OrdersCompany.js"
import ProductsCompany from "./components/companies/ProductsCompany.js"
import PersonalProfileCompany from "./components/companies/PersonalProfileCompany.js"
import AddProduct from "./components/companies/AddProduct.js"
import MakeAnOrder from "./components/users/MakeAnOrder.js"
import DisplayAllUsers from "./components/users/DisplayAllUsers.js"
import EditCompany from "./components/users/EditCompany.js"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.accessLevel === "undefined")
{
    localStorage._id = ""
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
                    <Route exact path="/" component={DisplayAllCompanies} />
                    <Route exact path="/Login" component={Login} />
                    <PrivateRoute exact path="/Logout" component={Logout}/>


                    <Route exact path="/SignIn" component={SignIn} />
                    <Route exact path="/DisplayAllCompanies" component={DisplayAllCompanies}/>
                    <PrivateRoute exact path="/PersonalProfile" component={PersonalProfile}/>
                    <PrivateRoute exact path="/Orders/:option" component={Orders}/>
                    <Route exact path="/DisplayAllProducts/:companyId" component={DisplayAllProducts}/>
                    <PrivateRoute exact path="/MakeAnOrder/:companyId/:productId" component={MakeAnOrder}/>
                    
                    <Route exact path="/SignInCompany" component={SignInCompany} />
                    <PrivateRoute exact path="/OrdersCompany/:option" component={OrdersCompany} />
                    <PrivateRoute exact path="/ProductsCompany" component={ProductsCompany}/>
                    <PrivateRoute exact path="/PersonalProfileCompany" component={PersonalProfileCompany}/>
                    <PrivateRoute exact path="/AddProduct" component={AddProduct}/>

                    <PrivateRoute exact path="/EditCompany/:companyId" component={EditCompany}/>
                    <PrivateRoute exact path="/DisplayAllUsers" component={DisplayAllUsers}/>
                    
                    
                    <Route path="*" component={DisplayAllCompanies}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}