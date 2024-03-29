import React, {Component} from "react"
import { OP_PENDING_ORDERS,OP_ALL_ORDERS } from "../../config/global_constants"
import OrdersTableRow from "./OrdersTableRow.js"


export default class OrdersTable extends Component 
{
    render() 
    {

        let statusColumn = <th>Status</th>//null
        let action = ""

        /*if(this.props.option === OP_ALL_ORDERS){
            statusColumn = <th>Status</th>
        }*/

        return (
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Product</th>
                        <th>Message</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.orders.map((order) => <OrdersTableRow key={order._id} order={order}/>)}
                </tbody>
            </table>      
        )
    }
}