import React, {Component} from "react"

import axios from "axios"

import CompanyTable from "./DisplayAllCompaniesTable"

import {SERVER_HOST} from "../../config/global_constants"

import Menu from "../users/Menu"

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
        axios.get('companies.json')//axios.get(`${SERVER_HOST}/api/company/all/`,{headers: {"auth-token": localStorage.token}})
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
                <Menu/>
                <div className="form-container">
                    <h3>Companies</h3>
                    <div className="table-container">
                        <CompanyTable companies={this.state.companies} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}