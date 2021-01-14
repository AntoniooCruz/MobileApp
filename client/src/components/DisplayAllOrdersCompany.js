import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import OrderCompanyTable from "./OrderCompanyTable"

import {SERVER_HOST} from "../config/global_constants"


export default class DisplayAllOrdersCompany extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            orders:[]
        }
    }
    
    
    componentDidMount() 
    {
        /*
        company_id = ???
        */
        axios.get(`orders.json`)//axios.get(`${SERVER_HOST}/order/company/${company_id}`)
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
                    this.setState({orders: res.data}) 
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
                        <OrderCompanyTable orders={this.state.orders} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}