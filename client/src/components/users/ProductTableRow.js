import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket,faCashRegister,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {ACCESS_LEVEL_NORMAL_USER,ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants"
import axios from 'axios'
import LinkInClass from "../LinkInClass"



export default class ProductTableRow extends Component 
{    
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

  disableProduct = (e) =>
    {
        console.log(this.props)
        const productModel = {
            company_id: this.props.company_id,
            price: this.props.product.price,
            name: this.props.product.name,
            img: this.props.product.img,
            is_available: false
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

    render() 
    {
        let admin;
        if (localStorage.accessLevel == ACCESS_LEVEL_ADMIN ) {
            admin = <Card.Header> 
                        <LinkInClass value="Disable" className="red-button" onClick={this.disableProduct}/>
                        <LinkInClass value="Delete" className="red-button" onClick={this.deleteProduct}/>
                    </Card.Header>
        } 
        return (
            
            <Card className="text-center">
            {admin}    
            <Card.Header>{this.props.product.name}</Card.Header>
            <Card.Img variant="top"src={`data:;base64,${this.props.product.img}`}/>
            <Card.Body>
              <Link  to={"/MakeAnOrder/" + this.props.product.company_id + "/" + this.props.product._id}>
              <Button variant="primary">Buy {this.props.product.price} zl  &nbsp;<FontAwesomeIcon icon={faCashRegister}/> </Button>
            </Link> 
            </Card.Body>
          </Card>

        )
    }
}