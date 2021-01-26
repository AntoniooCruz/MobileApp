import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_COMPANY, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"
import LinkInClass from "../LinkInClass"

export default class ProductsCompanyTableRow extends Component 
{    
    modifyAvailabilityProduct = (e) =>
    {
        console.log(this.props)
        const productModel = {
            company_id: localStorage._id,
            price: this.props.product.price,
            name: this.props.product.name,
            is_available: !this.props.product.is_available
        }

        
        axios.put(`${SERVER_HOST}/api/products/${this.props.product._id}`, productModel,{headers: {"auth-token": localStorage.token}})
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
                        console.log("Record update")
                    }   
                }
                else
                {
                    console.log("Error")
                }
            })
    }

    deleteProduct = (e) =>
    {
        axios.delete(`${SERVER_HOST}/api/products/${this.props.product._id}`,{headers: {"auth-token": localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                { 
                    console.log("Record deleted")
                }
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
    render() 
    {

        return (
            <tr>
                <td>{this.props.product._id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.img}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.is_available ? <FontAwesomeIcon className="green-icon" icon={faCheck}/> :  <FontAwesomeIcon className="red-icon" icon={faTimes}/>}</td>
                <td>
                    <div class="row">
                    <LinkInClass value={this.props.product.is_available ? "to Disable" : "to Enable"} className={this.props.product.is_available ? "red-button" : "green-button"} onClick={this.modifyAvailabilityProduct}/>
                    <LinkInClass value="Delete" className="red-button" onClick={this.deleteProduct} />
                    </div>
                </td>
            </tr>
        )
    }
}