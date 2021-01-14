import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import DisplayAllCompanies from "./DisplayAllCompanies"

import {SERVER_HOST} from "../config/global_constants"

import * as ReactBootStrap from "react-bootstrap";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner,faIdCard,faShippingFast,faBoxes,faHome} from '@fortawesome/free-solid-svg-icons';
import { Navbar } from "react-bootstrap"

export default class MainCompany extends Component 
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
                            <ReactBootStrap.Nav.Link href="#pendingOrders">
                                Pending Orders &nbsp;
                                <FontAwesomeIcon icon={faSpinner}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="#allOrders">
                                All Orders &nbsp;
                                <FontAwesomeIcon icon={faBoxes}/>
                            </ReactBootStrap.Nav.Link>
                            <ReactBootStrap.Nav.Link href="#personalProfile">
                                Personal Profile &nbsp;
                                <FontAwesomeIcon icon={faIdCard}/>
                            </ReactBootStrap.Nav.Link>
                        </ReactBootStrap.Nav>
                    </ReactBootStrap.Navbar.Collapse>
                </ReactBootStrap.Navbar>

                <DisplayAllCompanies/>
            </div>    
        )
    }
}