import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"


export default class Login extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            username:"",
            password:"",
            isLoggedIn:false
        }
    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})

    }

    handleSubmit = (e) => 
    {
        axios.post(`${SERVER_HOST}/api/users/login`,this.state.username,this.state.password)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    
                    localStorage.user_id = res.data.id
                    localStorage.username = res.data.username
                    localStorage.accessLevel = res.data.accessLevel  
                    localStorage.token = res.data.token
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })                
    }

   render() 
    {     
        return (
            <div> 
                
                {this.state.isLoggedIn ? <Redirect to="/Main"/> : null}

                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
                
                <h3 className="form-tittle">Login</h3>

                <div className="form-group">
                    <label className="label-form">Username</label>  
                    <input  className = "form-control"
                        name = "username"              
                        type = "username"
                        placeholder = "CharlesSmith"
                        autoComplete="username"
                        value = {this.state.username}
                        onChange = {this.handleChange}
                        ref = {input => this.inputToFocus = input}
                    />
                </div>
                    
                <div className="form-group">
                    <label className="label-form">Password</label>  
                    <input  className = "form-control"
                        name = "password"           
                        type = "password"
                        placeholder = "•••••••••••"
                        autoComplete="password"
                        title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                        value = {this.state.password}
                        onChange = {this.handleChange}
                    />
                </div>
                    
                <Link className="blue-button" onClick={this.handleSubmit}>Log In</Link>       
                        
                <Link className="light-blue-button" to={"/SignIn"}>Sign In</Link>

            </form>
            <br></br>
        </div>

        
        
    )
    }
}
