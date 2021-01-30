import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowUp,faClock} from '@fortawesome/free-solid-svg-icons';
import LinkInClass from "../LinkInClass"
import { SERVER_HOST, OP_PENDING_ORDERS, OP_ALL_ORDERS, ACCESS_LEVEL_NORMAL_USER, ACCESS_LEVEL_ADMIN  } from "../../config/global_constants";
import axios from "axios"

export default class DisplayAllUsersTableRow extends Component 
{    

    constructor(props) 
    {
        super(props)
        
        this.state = {
            itWasDeleted: false
        }
    }


    modifyAccessLevel = (e) =>
    {
        const userModel = {
            name: this.props.user.name,
            username: this.props.user.username,
            phone_number: this.props.user.phone_number,
            password: this.props.user.password,
            is_admin: !this.props.user.is_admin,

            
        }

        
        axios.put(`${SERVER_HOST}/api/user/${this.props.user._id}`, userModel,{headers: {"auth-token": localStorage.token}})
            .then(res => 
            {  
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)    
                    }
                    else
                    {           
                        console.log("Record update")
                        window.location.href = window.location.href;

                        if(localStorage._id == this.props.user._id){
                            localStorage.accessLevel = res.data.access_level
                        }
                    }   
                }
                else
                {
                    console.log("Error")
                }
            })
    }

    deleteUser = (e) =>
    {
        axios.delete(`${SERVER_HOST}/api/user/${this.props.user._id}`,{headers: {"auth-token": localStorage.token}})
        .then(res => 
        {
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                { 
                    console.log("Record deleted")
                    window.location.href = window.location.href;
                    if(localStorage._id == this.props.user._id){
                        this.setState({itWasDeleted: true})
                    }
                }
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
    render() 
    {

        let col = ""

        if(this.props.user.is_admin){
            col = <td>Admin</td>
        }else{
            col = <td>User</td>
        }
        
        return (
                <tr>
                    {this.state.itWasDeleted ? <Redirect to="/Logout" />: localStorage.accessLevel != ACCESS_LEVEL_ADMIN ? <Redirect to="/Login"/> : null }
                    <td>{this.props.user.username}</td>
                    <td>{this.props.user.name}</td>
                    {col}
                    <td>{
                        <div class="row">
                            <LinkInClass value={this.props.user.is_admin ? "Make User" : "Make Admin"} className={this.props.user.is_admin ? "red-button" : "green-button"} onClick={this.modifyAccessLevel}/>
                            <LinkInClass value="Delete" className="red-button" onClick={this.deleteUser} />
                        </div>
                    }</td>
                </tr>
        )
    }
}