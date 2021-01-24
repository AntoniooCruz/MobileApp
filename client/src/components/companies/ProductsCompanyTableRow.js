import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_COMPANY, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"
import LinkInClass from "../LinkInClass"

export default class ProductsCompanyTableRow extends Component 
{    




    modifyAvailabilityProduct = (e) =>
    {
        const productModel = {
            id: this.props.id,
            name: this.props.name,
            price: this.props.price,
            img: this.props.img,
            is_available: !this.props.is_available
        }

        
        axios.put(`${SERVER_HOST}/api/product`, productModel,{headers: {"auth-token": localStorage.token}})
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
        axios.delete(`${SERVER_HOST}/api/product/${this.props.product.id}`,{headers: {"auth-token": localStorage.token}})
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
                <td>{this.props.product.id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.img}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.is_avaiable ? <FontAwesomeIcon className="green-icon" icon={faCheck}/> :  <FontAwesomeIcon className="red-icon" icon={faTimes}/>}</td>
                <td>
                    <LinkInClass value={this.props.product.is_available ? "to Disable" : "to Enable"} className={this.props.product.is_available ? "red-button" : "green-button"} onClick={this.modifyAvailabilityProduct}/>
                    <LinkInClass value="Delete" className="red-button" onClick={this.deleteProduct} />
                </td>
            </tr>
        )
    }
}