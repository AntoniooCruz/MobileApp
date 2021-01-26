import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST,OP_ALL_ORDERS,OP_PENDING_ORDERS,NOT_FULL_FILLED,FULL_FILLED} from "../../config/global_constants"

import OrdersTable from "./OrdersTable.js"
import Menu from "./Menu.js"


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
        const user_id = localStorage._id
        axios.get(`${SERVER_HOST}/api/order/user/${user_id}`,{headers: {"auth-token": localStorage.token}})
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
                    console.log(res.data)
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

        const option = this.props.match.params.option

        return (      
            <div>
                <Menu/>
                <div className="form-container">
                    {option == OP_ALL_ORDERS ? <h3>All Orderes</h3> : <h3>Pending Orders</h3>}
                    <div className="table-container">
                        {console.log(this.state.orders)}
                        <OrdersTable orders={this.state.orders}/> 
                    </div>
                </div> 
            </div>    
        )
    }
}