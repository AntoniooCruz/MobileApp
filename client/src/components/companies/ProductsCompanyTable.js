import React, {Component} from "react"
import ProductsCompanyTableRow from "./ProductsCompanyTableRow"


export default class ProductsCompanyTable extends Component 
{
    render() 
    {
        return (
            <table>
                <tbody>
                    {this.props.products.map((product) => <ProductsCompanyTableRow key={product._id} product={product}/>)}
                </tbody>
            </table>      
        )
    }
}