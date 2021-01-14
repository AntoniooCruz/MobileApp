import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';

export default class OrderCompanyTableRow extends Component 
{    

    constructor(props) 
    {
        super(props)
        
        this.state = {
            product_id: this.props.data.product_id,
            productName: "",
            message: this.props.data.message,
            client_id: this.props.data.client_id,
            username: "",
            location: this.props.data.location,
            is_fulfilled: this.props.data.is_fulfilled
        }
    }

    componentDidMount() 
    {     
        axios.get(`${SERVER_HOST}/user/${this.state.client_id}`)
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

        axios.get(`${SERVER_HOST}/product/${this.state.product_id}`)
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

    render() 
    {
        return (
            <tr>
                <td>{this.state.productName}</td>
                <td>{this.state.message}</td>
                <td>{this.state.username}</td>
                <td>{this.state.location}</td>
                <td>{this.state.is_fulfilled}</td>
            </tr>
        )
    }
}