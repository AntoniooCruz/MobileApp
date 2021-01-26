import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faCheck} from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
import { OP_ALL_ORDERS, SERVER_HOST } from "../../config/global_constants";


export default class OrdersCompanyTableRow extends Component 
{    

    constructor(props) 
    {
        super(props)
        
        this.state = {
            product_id: this.props.order.product_id,
            productName: "",
            message: this.props.order.message,
            client_id: this.props.order.client_id,
            username: "",
            location: this.props.order.location,
            is_fulfilled: this.props.order.is_fulfilled
        }
    }

    componentDidMount() 
    {     
        axios.get(`${SERVER_HOST}/api/user/${this.state.client_id}`)
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
                    this.setState({username: res.data.username}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })  
        axios.get(`${SERVER_HOST}/api/products/${this.state.product_id}`)
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
                    this.setState({productName: res.data.name}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

    handleDeliveredOrder = (e) =>
    {
        this.setState({is_fulfilled: true})
    }

    render() 
    {
        
        const option = this.props.match.params.option

        let action = ""

        if(option == OP_ALL_ORDERS || !this.props.order.is_fulfilled){
            action = 
            <tr>
                <td>{this.state.productName}</td>
                <td>{this.state.message}</td>
                <td>{this.state.username}</td>
                <td>{this.state.location}</td>
                <td>{this.state.is_fulfilled ? 
                        <FontAwesomeIcon className="green-icon" icon={faCheck}/> 
                        : <FontAwesomeIcon className="red-icon" icon={faClock} onClick={this.handleDeliveredOrder}/> }
                </td>
            </tr>
        }

        return (
            {action}
        )
    }
}