import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"
import {SERVER_HOST,OP_ALL_ORDERS,OP_PENDING_ORDERS} from "../config/global_constants"

import DisplayAllCompanies from "./DisplayAllCompanies"


import * as ReactBootStrap from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faIdCard,faShippingFast,faBoxes} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "react-bootstrap"
import PersonalProfile from "./PersonalProfile"
import Orders from "./Orders.js"

export default class Main extends Component 
{
  
    render() 
    {   


        let opAux = window.location.href.split('#',2)

        let option = "" 

        switch(opAux[1]){
            case "home":
                option = <DisplayAllCompanies/>
                break;
            case "personalProfile": 
                option = <PersonalProfile/>
                break;
            case "orders/pending": 
                option = <Orders option={OP_PENDING_ORDERS}/>
                break;
            case "orders/all": 
                option = <Orders option={OP_ALL_ORDERS}/>
                break;
            default:
                option = <DisplayAllCompanies/>
        }

        return (      
            <div>
                <ReactBootStrap.Navbar bg="light" expand="lg">
                    <ReactBootStrap.Navbar.Brand>Main Menu</ReactBootStrap.Navbar.Brand>
                    <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
                        <ReactBootStrap.Nav className="mr-auto">
                            <ReactBootStrap.Nav.Link href="#home">
                                Home &nbsp;
                                <FontAwesomeIcon icon={faHome}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="#personalProfile">
                                Personal Profile &nbsp;
                                <FontAwesomeIcon icon={faIdCard}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.NavDropdown title="Orders" id="basic-nav-dropdown">
                                <ReactBootStrap.NavDropdown.Item href="#orders/pending">
                                    Pending Orders &nbsp;
                                    <FontAwesomeIcon icon={faShippingFast}/>
                                </ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Divider />
                                <ReactBootStrap.NavDropdown.Item href="#orders/all">
                                    All Orders &nbsp;
                                    <FontAwesomeIcon icon={faBoxes}/>
                                </ReactBootStrap.NavDropdown.Item>
                            </ReactBootStrap.NavDropdown>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>

                {option}
            </div>    
        )
    }
}