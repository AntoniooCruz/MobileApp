import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_COMPANY, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"
import LinkInClass from "../LinkInClass"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class ProductsCompanyTableRow extends Component 
{    
    modifyAvailabilityProduct = (e) =>
    {
        console.log(this.props)
        const productModel = {
            company_id: localStorage._id,
            price: this.props.product.price,
            name: this.props.product.name,
            img: this.props.product.img,
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
                        window.location.href = window.location.href;
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
                    window.location.href = window.location.href;
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

            <Card className="text-center">
                <Card.Header>{this.props.product.name}</Card.Header>
                <Card.Img variant="top"src={`data:;base64,${this.props.product.img}`}/>
                <Card.Body>
                    <Card.Text>
                        Price:   &nbsp;{this.props.product.price} zl
                    </Card.Text>
                    <Card.Text>
                        Availability:   &nbsp; {this.props.product.is_available ? <FontAwesomeIcon className="green-icon" icon={faCheck}/> :  <FontAwesomeIcon className="red-icon" icon={faTimes}/>}
                    </Card.Text>
                    <Card.Text>
                        <LinkInClass value={this.props.product.is_available ? "Disable" : "Enable"} className={this.props.product.is_available ? "red-button" : "green-button"} onClick={this.modifyAvailabilityProduct}/>
                        <LinkInClass value="Delete" className="red-button" onClick={this.deleteProduct} />
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}