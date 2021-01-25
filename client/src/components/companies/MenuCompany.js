import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import axios from "axios"

import DisplayAllCompanies from "../users/DisplayAllCompanies"

import {SERVER_HOST,OP_PENDING_ORDERS, OP_ALL_ORDERS, ACCESS_LEVEL_GUEST} from "../../config/global_constants"

import * as ReactBootStrap from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner,faIceCream,faIdCard,faSignOutAlt,faBoxes,faIce} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "react-bootstrap"

import OrdersCompany from "./OrdersCompany.js"
import PersonalProfileCompany from "../companies/PersonalProfileCompany.js"
import ProductsCompany from "./ProductsCompany.js"

export default class MenuCompany extends Component 
{
    constructor(props) 
    {
        super(props)
    }

  
    render() 
    {   
        return (      
            <div>
                <ReactBootStrap.Navbar bg="light" expand="lg">
                    <ReactBootStrap.Navbar.Brand>Main Menu Company</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <ReactBootStrap.Nav.Link href="/OrdersCompany/Pending">
                                Pending Orders &nbsp;
                                <FontAwesomeIcon icon={faSpinner}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/OrdersCompany/All">
                                All Orders &nbsp;
                                <FontAwesomeIcon icon={faBoxes}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/ProductsCompany">
                                Products &nbsp;
                                <FontAwesomeIcon icon={faIceCream}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="/PersonalProfileCompany">
                                Personal Profile &nbsp;
                                <FontAwesomeIcon icon={faIdCard}/>
                            </ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav>
                        <Link className="dark-blue-button" to={"/Logout"}>Log Out  &nbsp; <FontAwesomeIcon icon={faSignOutAlt}/> </Link>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>
                
            </div>    
        )
    }
}