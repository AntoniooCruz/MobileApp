import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST,OP_ALL_ORDERS,OP_PENDING_ORDERS,NOT_FULL_FILLED,FULL_FILLED} from "../../config/global_constants"

import OrdersCompanyTable from "../companies/OrdersCompanyTable.js"
import MenuCompany from "./MenuCompany"


export default class OrdersCompany extends Component 
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
        const option = this.props.match.params.option
        console.log(option)
        let ordersAux = [];
        const company_id = localStorage._id
        axios.get(`${SERVER_HOST}/api/order/company/${company_id}`,{headers: {"auth-token": localStorage.token}})
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
        console.log(option)
        return (      
            <div>
                <MenuCompany/>
                <div className="form-container">
                    {option == "All" ? <h3>All Orders</h3> : <h3>Pending Orders</h3>}
                    <div className="table-container">
                        <OrdersCompanyTable orders={this.state.orders} option={option}/> 
                    </div>
                </div> 
            </div>    
        )
    }
}