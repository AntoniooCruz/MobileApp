import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import CompanyTable from "./CompanyTable"

import {SERVER_HOST} from "../config/global_constants"


export default class DisplayAllCompanies extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            companies:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`companies.json`)//axios.get(`${SERVER_HOST}/company/`)
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {           
                    console.log("Records read")   
                    this.setState({companies: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

  
    render() 
    {   
        return (      
            <div>
               {/* <div id="sidemenu" class="menu-collapsed">
                    <div id="header">
                        <div id="title"><span>Vida MRR</span></div>
                        <div id="menu-btn">
                            <div class="btn-hamburger"></div>
                            <div class="btn-hamburger"></div>
                            <div class="btn-hamburger"></div>
                        </div>
                    </div>
                    <div id="profile">
                        <div id="name"><span>Rubén Oubina</span></div>
                    </div>
                    <div id="menu-items">
                        <div class="item">
                            <a href="#">
                                <div class="icon"><img src="logo.png" alt=""></img></div>
                                <div class="title"><span>Cloud Services</span></div>
                            </a>
                        </div>
                    </div>
        </div> */}
                <div className="form-container">
                    
                    <div className="table-container">
                        <CompanyTable companies={this.state.companies} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}