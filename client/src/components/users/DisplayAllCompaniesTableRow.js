import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import DisplayAllProducts from "./DisplayAllProducts"
import LinkInClass from "../LinkInClass"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {ACCESS_LEVEL_NORMAL_USER,ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants"

import axios from "axios"

export default class DisplayAllCompaniesTableRow extends Component 
{    

/*
  edit = (e) => {
     e.preventDefault();
     <Redirect to={"Edit/"+this.props.company._id} />
  }*/



  deleteCompany = (e) =>
  {
      axios.delete(`${SERVER_HOST}/api/company/${this.props.company._id}`,{headers: {"auth-token": localStorage.token}})
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
      let admin;
      if (localStorage.accessLevel == ACCESS_LEVEL_ADMIN ) {
        
        admin = <Card.Header> 
                  <Link className="dark-blue-button" to={"EditCompany/"+this.props.company._id} >Edit &nbsp;<FontAwesomeIcon icon={faEdit}/> </Link>
                  <LinkInClass value="Delete" className="blue-button" onClick={this.deleteCompany}/>
                </Card.Header>
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

