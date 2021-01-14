import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';

export default class CompanyTableRow extends Component 
{    
    render() 
    {
        return (
            <tr>
                <td>{this.props.company.name}</td>
                <td>{this.props.company.phone_number}</td>
                <td>         
                    <Link className="green-button" to={"/SeeProducts/" + this.props.company._id}>
                        <FontAwesomeIcon icon={faShoppingBasket}/>
                    </Link>
                </td>
            </tr>
        )
    }
}