import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckSquare,faClock} from '@fortawesome/free-solid-svg-icons';
import { SERVER_HOST, OP_PENDING_ORDERS, OP_ALL_ORDERS  } from "../../config/global_constants";
import axios from "axios"

export default class OrdersTableRow extends Component 
{    
    constructor(props) 
    {
        super(props)
        
        this.state = {
            company:"",
            product:"",
            message:"",
            price:null,
            is_fullfilled:null
        }
    }

    

    componentDidMount() 
    {     
        this.setState({company:this.getCompanyName()})
        this.setState({product:this.getProductName()})
        this.setState({message:this.props.order.message})
        this.setState({price:this.props.order.price})
        this.setState({is_fullfilled:this.props.order.status})
    }


    getCompanyName(){
        const company_id = this.props.order.company
        let company_name = ""
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
                    company_name = res.data.name
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })

        return company_name
    }
    

    getProductName(){
        const product_id = this.props.order.product
        let product_name = ""
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
                    product_name = res.data.name
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })

        return product_name
    }

    

    render() 
    {

        const option = this.props.match.params.option

        let iconFullFilled = ""
        if(this.state.is_fullfilled && option == OP_ALL_ORDERS){
            iconFullFilled = <FontAwesomeIcon style="color:green"icon={faCheckSquare}/>
        }
        else{
            iconFullFilled = <FontAwesomeIcon style="color:red" icon={faClock}/>
        }
        return (
            <div>
                {option == OP_ALL_ORDERS ? <h3>All Orders</h3> : <h3>Pending Orders</h3>}

                {!this.state.is_fullfilled || option==OP_ALL_ORDERS ?
                    <tr>
                        <td>{this.state.company}</td>
                        <td>{this.state.product}</td>
                        <td>{this.state.message}</td>
                        <td>{this.state.price}</td>
                        {option == OP_ALL_ORDERS ? <td>{iconFullFilled}</td> : null}
                    </tr>
                    : null
                }
            </div>
        )
    }
}