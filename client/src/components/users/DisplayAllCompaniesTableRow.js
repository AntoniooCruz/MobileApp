import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import DisplayAllProducts from "./DisplayAllProducts"
import LinkInClass from "../LinkInClass"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {ACCESS_LEVEL_NORMAL_USER,ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants"

export default class DisplayAllCompaniesTableRow extends Component 
{    
    render() 
    {
      let admin;
      if (localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ) {
        admin = <Card.Header>  <Button variant="info"> <FontAwesomeIcon icon={faEdit}/></Button> <Button variant="danger"> <FontAwesomeIcon icon={faTrash}/></Button> </Card.Header> 
      } 

        return (

            <Card className="text-center m-3">
            {admin}
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

