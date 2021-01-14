import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import DisplayAllCompanies from "./DisplayAllCompanies"

import {SERVER_HOST} from "../config/global_constants"

import * as ReactBootStrap from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome,faIdCard,faShippingFast,faBoxes} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "react-bootstrap"

export default class Main extends Component 
{
    constructor(props) 
    {
        super(props)
    }
    
    
    componentDidMount() 
    {
        
    }

  
    render() 
    {   
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
                                <ReactBootStrap.NavDropdown.Item href="#action/3.1">
                                    Pending Orders &nbsp;
                                    <FontAwesomeIcon icon={faShippingFast}/>
                                </ReactBootStrap.NavDropdown.Item>
                                <ReactBootStrap.NavDropdown.Divider />
                                <ReactBootStrap.NavDropdown.Item href="#action/3.2">
                                    All Orders &nbsp;
                                    <FontAwesomeIcon icon={faBoxes}/>
                                </ReactBootStrap.NavDropdown.Item>
                            </ReactBootStrap.NavDropdown>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>

                <DisplayAllCompanies/>
            </div>    
        )
    }
}