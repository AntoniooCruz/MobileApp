import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket,faCashRegister} from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class ProductTableRow extends Component 
{    

    render() 
    {
        return (
            <Card className="text-center">
            <Card.Header>{this.props.product.name}</Card.Header>
            <Card.Img variant="top"src={`data:;base64,${this.props.product.img}`}/>
            <Card.Body>
              <Card.Text>
              {this.props.product.price}
              </Card.Text>
              <Link className="dark-blue-button" to={"/MakeAnOrder/" + this.props.product.company_id + "/" + this.props.product._id}>
                  Buy &nbsp;<FontAwesomeIcon icon={faCashRegister}/>
                </Link>              
            </Card.Body>
          </Card>
        )
        /*
        return (
                    <tr>
                        <td>{this.props.product.name}</td>
                        <td>{this.props.product.img}</td>
                        <td>{this.props.product.price}</td>
                        <td>  
                            <FontAwesomeIcon icon={faCheck}/>
                        </td>
                    </tr>
        )

        */
    }
}