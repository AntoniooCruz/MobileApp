import React, {Component} from "react"

import {Redirect, Link} from "react-router-dom"

import axios from "axios"

import DisplayAllUsersTable from "./DisplayAllUsersTable"

import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_COMPANY, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"

import Menu from "../users/Menu"

export default class DisplayAllUsers extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            users:[]
        }
    }
    
    
    componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/api/user/all/users`,{headers: {"auth-token": localStorage.token}})
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
                    console.log("Records read")   
                    this.setState({users: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
    }

  
    render() 
    {   
        return (      
            <div>
                {localStorage.accessLevel != ACCESS_LEVEL_ADMIN ? <Redirect to={"/Login"}/> : null}
                <Menu/>
                <div className="form-container-big" width="2000px">
                    <h3>Users</h3>
                    <div className="table-container">
                        <DisplayAllUsersTable users={this.state.users} /> 
                    </div>
                </div> 
            </div>    
        )
    }
}