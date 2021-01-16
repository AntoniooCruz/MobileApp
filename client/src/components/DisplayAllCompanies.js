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
        axios.get(`companies.json`)//axios.get(`${SERVER_HOST}/api/company/`)
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
                <div className="form-container">
                    
                    <div className="table-container">
                        <CompanyTable companies={this.state.companies} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}