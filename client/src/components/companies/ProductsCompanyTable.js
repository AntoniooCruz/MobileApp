import React, {Component} from "react"
import ProductsCompanyTableRow from "./ProductsCompanyTableRow"


export default class ProductsCompanyTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th></th> {/*Img*/}
                        <th>Price</th>
                        <th>Availability</th>
                        <th></th> {/**Options*/}
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.products.map((product) => <ProductsCompanyTableRow key={product._id} product={product}/>)}
                </tbody>
            </table>      
        )
    }
}