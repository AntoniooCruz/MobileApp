import React, {Component} from "react"
import OrderCompanyTableRow from "./OrderCompanyTableRow"


export default class OrderCompanyTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Message</th>
                        <th>Client</th>
                        <th>Location</th>
                        <th>Status</th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.orders.map((order) => <OrderCompanyTableRow key={order._id} order={order} />)}
                </tbody>
            </table>      
        )
    }
}