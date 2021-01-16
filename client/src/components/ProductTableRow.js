import React, {Component} from "react"
import {Link} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons';

export default class ProductTableRow extends Component 
{    

    render() 
    {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.img}</td>
                <td>{this.props.product.price}</td>
                <td>  
                    {/*At should appair a botton to a window where i can pay with paypal*/ }
                    {/*<Link className="green-button" to={"/SeeProducts/" + this.props.company._id}>
                        <FontAwesomeIcon icon={faShoppingBasket}/>
                    </Link>*/}
                </td>
            </tr>
        )
    }
}