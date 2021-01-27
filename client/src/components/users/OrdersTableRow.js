import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck,faClock} from '@fortawesome/free-solid-svg-icons';

import { SERVER_HOST, OP_PENDING_ORDERS, OP_ALL_ORDERS  } from "../../config/global_constants";
import axios from "axios"

export default class OrdersTableRow extends Component 
{    
    constructor(props) 
    {
        super(props)
        
        this.state = {
            company_name:"",
            product:"",
            price:""
        }
    }

    

    componentDidMount() 
    {     
        this.getCompanyName();
        this.getProductInfo();
    }


    getCompanyName(){
        const company_id = this.props.order.company_id
        axios.get(`${SERVER_HOST}/api/company/${company_id}`,{headers: {"auth-token": localStorage.token}})
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
                    this.setState({company_name: res.data.name}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }
    

    getProductInfo(){
        const product_id = this.props.order.product_id
        axios.get(`${SERVER_HOST}/api/products/${product_id}`,{headers: {"auth-token": localStorage.token}})
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
                    this.setState({price: res.data.price})
                    this.setState({product_name: res.data.name})
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
        console.log(this.props.order)
        return (
                <tr>
                    <td>{this.state.company_name}</td>
                    <td>{this.state.product_name}</td>
                    <td>{this.props.order.message}</td>
                    <td>{this.state.price} &nbsp; zl</td>
                    <td>{this.props.order.is_fulfilled ? <FontAwesomeIcon className="green-icon" icon={faCheck}/> : <FontAwesomeIcon  className="red-icon" icon={faClock}/> }</td>
                </tr>
        )
    }
}