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
        const ordersAux = []
        const option = this.props.match.params.option
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
                    console.log("Records read") 
                    if(option == "Pending"){
                        for(let i = 0; i < res.data.length; i++){
                            if(!res.data[i].is_fulfilled){
                                ordersAux.push(res.data[i])
                            }
                        }

                        this.setState({orders: ordersAux})
                    }else{
                        this.setState({orders:res.data})
                    }
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
                    {option == "All" ? <h3>All Orders</h3> : <h3>Pending Orders</h3>}
                    <div className="table-container">
                        <OrdersTable orders={this.state.orders}/> 
                    </div>
                </div> 
            </div>    
        )
    }
}