import React, {Component} from "react"
import ProductTableRow from "./ProductTableRow"


export default class ProductTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th></th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.companies.map((company) => <CompanyTableRow key={company._id} company={company}/>)}
                </tbody>
            </table>      
        )
    }
}