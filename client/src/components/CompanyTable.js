import React, {Component} from "react"
import CompanyTableRow from "./CompanyTableRow"


export default class CompanyTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th> </th>
                    </tr>
                </thead>
                  
                <tbody>
                    {this.props.companies.map((company) => <CompanyTableRow key={company._id} company={company}/>)}
                </tbody>
            </table>      
        )
    }
}