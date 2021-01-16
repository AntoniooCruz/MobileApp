import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST,OP_ALL_ORDERS,OP_PENDING_ORDERS,NOT_FULL_FILLED,FULL_FILLED} from "../config/global_constants"

import OrdersTable from "./OrdersTable.js"


export default class Orders extends Component 
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
        const user_id = localStorage.user_id
        axios.get(`${SERVER_HOST}/api/order/user/${user_id}`)
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
                    {this.props.option == OP_ALL_ORDERS ? <h3>All Orderes</h3> : <h3>Pending Orders</h3>}
                    <div className="table-container">
                        <OrdersTable orders={this.state.orders} option={this.props.option} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}