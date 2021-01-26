import React, {Component} from "react"
import CompanyTableRow from "./DisplayAllCompaniesTableRow"




export default class DisplayAllCompaniesTable extends Component 
{
    render() 
    {
        return (
            <table>
                <tbody>
                    {this.props.companies.map((company) => <CompanyTableRow key={company._id} company={company}/>)}
                </tbody>
            </table>      
        )
    }
}
