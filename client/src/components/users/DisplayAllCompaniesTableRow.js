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
            <Card.Header>Beach Bar</Card.Header>
            <Card.Img variant="top"src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" />
            <Card.Body>
              <Card.Title>{this.props.company.name}</Card.Title>
              <Card.Text>
                With supporting text below as a natural lead-in to additional content.
              </Card.Text>
              <Link  to={"/DisplayAllProducts/" + this.props.company.id}>
              <Button variant="primary">See Products</Button>
            </Link> 
             
              
            </Card.Body>
            <Card.Footer className="text-muted"> Phone Number: {this.props.company.phone_number}</Card.Footer>
          </Card>
        )
    }
}

