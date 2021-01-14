import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import CompanyTable from "./CompanyTable"

import {SERVER_HOST} from "../config/global_constants"


export default class DisplayAllProducts extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[]
        }
    }
    
    
    componentDidMount() 
    {
        /*
        get id of the company
        */
        axios.get(`${SERVER_HOST}/product/company/${company_id}`)
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
                    this.setState({products: res.data}) 
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
                        <ProductTable products={this.state.products} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}