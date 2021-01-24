import React, {Component} from "react"

import axios from "axios"

import ProductsCompanyTable from "./ProductsCompanyTable"

import {SERVER_HOST} from "../../config/global_constants"


export default class ProductsCompany extends Component 
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
        const company_id = localStorage._id
        axios.get(`${SERVER_HOST}/api/product/company/${company_id}` ,{headers: {"auth-token": localStorage.token}})
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
                    <h3>Products</h3>
                    <div className="table-container">
                        <ProductsCompanyTable products={this.state.products} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}