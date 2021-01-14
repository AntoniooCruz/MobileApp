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

        console.log(this.state.username)
    }

    handleSubmit = (e) => 
    {
//        e.preventDefault()


        console.log("klsjsls")

        //axios.post(`${SERVER_HOST}/users/login`,this.state.username,this.state.password)
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
                    console.log("User logged in")
                    
                    sessionStorage.name = res.data.name
                    sessionStorage.accessLevel = res.data.accessLevel
                    
                    this.setState({isLoggedIn:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
    }
 
   render() 
    {     
        return (
            <div> 
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
                        ref = {input => this.inputToFocus = input}
                    />
                </div>
                    
                <Link className="blue-button" onClick={this.handleSubmit()}>Log In</Link>       
                        
                <Link className="light-blue-button" to={"/SignIn"}>Sign In</Link>

            </form>
            <br></br>
        </div>

        
        
    )
    }
}
