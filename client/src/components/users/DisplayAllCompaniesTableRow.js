import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import DisplayAllProducts from "./DisplayAllProducts"
import LinkInClass from "../LinkInClass"

export default class DisplayAllCompaniesTableRow extends Component 
{    
    render() 
    {
        let click = false

        return (

            <div>
                <tr>
                    <td>{this.props.company.name}</td>
                    <td>{this.props.company.phone_number}</td>
                    <td>         
                        <Link className="dark-blue-button" to={"/DisplayAllProducts/" + this.props.company.id}>
                            <FontAwesomeIcon icon={faShoppingBasket}/>
                        </Link> 
                    </td>
                </tr>          
            </div>
            
        )
    }
}