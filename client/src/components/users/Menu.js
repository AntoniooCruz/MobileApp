import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"

import axios from "axios"
import {SERVER_HOST,OP_ALL_ORDERS,OP_PENDING_ORDERS,ACCESS_LEVEL_GUEST,ACCESS_LEVEL_NORMAL_USER} from "../../config/global_constants";

import DisplayAllCompanies from "../users/DisplayAllCompanies"


import * as ReactBootStrap from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faIdCard,faShippingFast,faBoxes, faSignOutAlt, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "react-bootstrap"
import PersonalProfile from "./PersonalProfile"
import Orders from "./Orders.js"
import Login from "../Login.js"

export default class Menu extends Component 
{
    render() 
    {   
        return (      
            <div>
                <ReactBootStrap.Navbar bg="light" expand="lg">
                    <ReactBootStrap.Navbar.Brand>Main Menu</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <ReactBootStrap.Nav.Link href="/DisplayAllCompanies">
                                Home &nbsp;
                                <FontAwesomeIcon icon={faHome}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href={localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? "/PersonalProfile" : "/Login"}>
                                Personal Profile &nbsp;
                                <FontAwesomeIcon icon={faIdCard}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.NavDropdown title="Orders" id="basic-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href={localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? "/Orders/Pending" : "/Login"}>
                                    Pending Orders &nbsp;
                                    <FontAwesomeIcon icon={faShippingFast}/>
                                </ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Divider />
                                <ReactBootStrap.NavDropdown.Item href={localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? "/Orders/All" : "/Login"}>
                                    All Orders &nbsp;
                                    <FontAwesomeIcon icon={faBoxes}/>
                                </ReactBootStrap.NavDropdown.Item>
                            </ReactBootStrap.NavDropdown>
                            
                        </ReactBootStrap.Nav>
                        {
                            localStorage.accessLevel == ACCESS_LEVEL_GUEST ? 
                            <Link className="light-blue-button" to={"/Login"}><FontAwesomeIcon icon={faSignInAlt}/> &nbsp; Log In</Link>
                            :
                            <Link className="dark-blue-button" to={"/Logout"}>Log Out  &nbsp; <FontAwesomeIcon icon={faSignOutAlt}/> </Link>
                        }
                        
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>
            </div>    
        )
    }
}