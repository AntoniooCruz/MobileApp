import React, {Component} from "react"
import DisplayAllUsersTableRow from "./DisplayAllUsersTableRow"




export default class DisplayAllUsersTable extends Component 
{
    render() 
    {
        return (
            <table>
                <thead>
                    <td>Username</td>
                    <td>Name</td>
                    <td>Rank</td>
                    <td></td>
                </thead>
                <tbody>
                    {this.props.users.map((user) => <DisplayAllUsersTableRow key={user._id} user={user}/>)}
                </tbody>
            </table>      
        )
    }
}
