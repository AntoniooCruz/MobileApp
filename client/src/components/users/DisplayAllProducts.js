import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import ProductTable from "../users/ProductTable"

import {SERVER_HOST} from "../../config/global_constants"
import Menu from "./Menu.js"

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

        const company_id = this.props.match.params.companyId

        axios.get(`${SERVER_HOST}/api/products/company/${company_id}`)
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
                <Menu/>
                <div className="form-container">
                    <div className="table-container">
                        <ProductTable products={this.state.products} /> 
                    </div>

                    
                </div> 
            </div>    
        )
    }
}