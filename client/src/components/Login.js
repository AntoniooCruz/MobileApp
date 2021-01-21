import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_COMPANY, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"


export default class Login extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            username:"",
            password:"",
            isLoggedIn: false
        }
    }
    
    componentDidMount()
    {
        //this.setState({isLoggedIn:(localStorage.accessLevel === ACCESS_LEVEL_GUEST) ? false: true})
    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})

    }

    handleSubmit = (e) => 
    {
        const userObject = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(`${SERVER_HOST}/api/user/login`,userObject)
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
                    
                    localStorage._id = res.data.id
                    localStorage.username = res.data.username
                    localStorage.accessLevel = ACCESS_LEVEL_COMPANY//res.data.acess_level
                    localStorage.token = res.data.token

                    console.log(localStorage.accessLevel)
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })                
    }

    oneKeyPressFunction = (e) =>
    {

        if(e.charCode === 13){
            this.handleSubmit()
        }
    }

    

   render() 
    {     

        let redirectAction = null
        if(this.state.isLoggedIn){
            switch(localStorage.accessLevel){
                case ACCESS_LEVEL_NORMAL_USER:
                    redirectAction = <Redirect to="/Main"/>
                    break
                case ACCESS_LEVEL_COMPANY:
                    redirectAction = <Redirect to="/MainCompany"/>
                    break
                /*case ACCESS_LEVEL_ADMIN:
                    redirectAction = <Redirect to "/MainAdmin"/>
                    break*/
                case ACCESS_LEVEL_GUEST:
                default:
                    console.log("bb")
                    redirectAction = null         
            }
        }
        
        return (
            <div> 
                
                {this.state.isLoggedIn ? redirectAction : null}

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
                            onKeyPress = {this.oneKeyPressFunction}
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
