import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import LinkInClass from "./LinkInClass"
import axios from "axios"

import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_COMPANY, ACCESS_LEVEL_GUEST, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST,OP_PENDING_ORDERS} from "../config/global_constants"


export default class Login extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            username:"",
            password:"",
            errorNoValid: false,
            errorWrongPassword: false,
            errorServer: false,
            isLoggedIn: false
        }
    }
    
    componentDidMount()
    {
        this.setState({isLoggedIn:(parseInt(localStorage.accessLevel) === ACCESS_LEVEL_GUEST) ? false: true})
    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})

    }

    handleSubmit = (e) => 
    {

        this.setState({errorNoValid: false})
        this.setState({errorServer: false})

        const userObject = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(`${SERVER_HOST}/api/user/login`,userObject,{headers: {"auth-token": localStorage.token}})
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
                    localStorage.accessLevel = res.data.access_level
                    localStorage.token = res.data.token
                    
                    this.setState({errorNoValid: false})
                    this.setState({errorServer: false})


                    //console.log(localStorage.accessLevel)
                    
                    this.setState({isLoggedIn:true})

                }        
            }
            else
            {
                console.log("Login failed")
            }
        }).catch((error) => {
            console.log(error.response.status)
            switch(error.response.status){
                case 400:
                    this.setState({errorNoValid: true})
                    break
                case 401:
                    this.setState({errorWrongPassword: true})
                    break
                default:
                    this.setState({errorServer: true})
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

        let redirectAction = ""

        console.log("ACCESS LEVEL: " + parseInt(localStorage.accessLevel))

        switch(parseInt(localStorage.accessLevel)){            
            case (ACCESS_LEVEL_NORMAL_USER):
                console.log("It works")
                redirectAction = <Redirect to="/DisplayAllCompanies"/>
                break;
            case (ACCESS_LEVEL_COMPANY):
                redirectAction = <Redirect to={"/OrdersCompany/Pending"} />
                break;
            case (ACCESS_LEVEL_ADMIN):
                redirectAction = <Redirect to={"/DisplayAllCompanies"}/>
                break;
            case (ACCESS_LEVEL_GUEST):
            default:
                break;
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
                            title = "Password must be at least 6 digits long"
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            onKeyPress = {this.oneKeyPressFunction}
                        />
                    </div>

                    {this.state.errorServer ? <p className="error-message" >Server Fail</p> :
                     this.state.errorNoValid ? <p className="error-message" >Username doesn´t exist</p> :
                     this.state.errorWrongPassword ? <p className="error-message" >Password incorrect</p>
                     :null}
                           
                    <LinkInClass value="Log In" className="blue-button" onClick={this.handleSubmit} /> 
                            
                    <Link className="light-blue-button" to={"/SignIn"}>Sign In</Link>
                    <Link className="dark-blue-button" to={"/DisplayAllCompanies"}>Display All Companies</Link>

                </form>
                <br></br>
            </div>
        )
    }
}
