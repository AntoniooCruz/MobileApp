import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import DisplayAllProducts from "./DisplayAllProducts"
import LinkInClass from "../LinkInClass"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class DisplayAllCompaniesTableRow extends Component 
{    
    render() 
    {

        return (
            <Card className="text-center">
            <Card.Header>{this.props.company.name}</Card.Header>
            <Card.Img variant="top"src={`data:;base64,${this.props.company.img}`}/>
            <Card.Body>
              <Card.Text>
              {this.props.company.description}
              </Card.Text>
              <Link  to={"/DisplayAllProducts/" + this.props.company._id}>
              <Button variant="primary">See Products</Button>
            </Link> 
            </Card.Body>
            <Card.Footer className="text-muted"> Phone Number: {this.props.company.phone_number}</Card.Footer>
          </Card>
        )
    }
}

