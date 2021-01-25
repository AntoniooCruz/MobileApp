import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"

import axios from "axios"
import {SERVER_HOST,OP_ALL_ORDERS,OP_PENDING_ORDERS,ACCESS_LEVEL_GUEST} from "../../config/global_constants";

import DisplayAllCompanies from "../users/DisplayAllCompanies"


import * as ReactBootStrap from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faIdCard,faShippingFast,faBoxes, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
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
                            <ReactBootStrap.Nav.Link href="/PersonalProfile">
                                Personal Profile &nbsp;
                                <FontAwesomeIcon icon={faIdCard}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.NavDropdown title="Orders" id="basic-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href="/Orders/Pending">
                                    Pending Orders &nbsp;
                                    <FontAwesomeIcon icon={faShippingFast}/>
                                </ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Divider />
                                <ReactBootStrap.NavDropdown.Item href="/Orders/All">
                                    All Orders &nbsp;
                                    <FontAwesomeIcon icon={faBoxes}/>
                                </ReactBootStrap.NavDropdown.Item>
                            </ReactBootStrap.NavDropdown>
                            <ReactBootStrap.Nav.Link href="/Logout">
                                Log Out &nbsp;
                                <FontAwesomeIcon icon={faSignOutAlt}/>
                            </ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>
            </div>    
        )
    }
}