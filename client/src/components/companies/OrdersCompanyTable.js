import React, {Component} from "react"
import OrdersCompanyTableRow from "../companies/OrdersCompanyTableRow.js"
import { OP_ALL_ORDERS } from "../../config/global_constants"

export default class OrdersCompanyTable extends Component 
{
    render() 
    {
        
        return (
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Client</th>
                        <th>Message</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.orders.map((order) => <OrdersCompanyTableRow key={order._id} order={order}/>)}
                </tbody>
            </table>      
        )
    }
}