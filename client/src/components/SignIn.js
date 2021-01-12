import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import LinkInClass from "../components/LinkInClass"


export default class SignIn extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            username:"",
            isValidUsername: false,
            name:"",
            isValidName: false,
            phone_number:null,
            isValidphone_number: false,
            password:"",
            isValidPassword: false,
            passwordConfirmation:"",
            submited:false,
            isRegistered:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})

    }

    validateConfirmPassword()
    {    
        return (this.state.password === this.state.passwordConfirmation); 
    }

    validateName()
    {    
        if(this.state.name.length>0){
            return true;
        }
        return false;
    }


    validateUsername()
    {    
        if(this.state.username.length>3){
            return true;
        }
        return false;
    }


    validatePassword(){
        if(this.state.password.length>5){
            return true;
        }
        return false;
    }

    validatephone_number(){
        if(this.state.phone_number>0){
            return true;
        }
        return false;
    }

    validate(){
        this.state.isValidUsername = this.validateUsername();
        this.state.isValidName = this.validateName();
        this.state.isValidphone_number = this.validatephone_number();
        this.state.isValidPassword = this.validatePassword();
    }

    isAllValid(){
        return this.state.isValidUsername && this.state.isValidName && this.state.isValidphone_number && this.state.isValidPassword && this.validateConfirmPassword();
    }


    handleSubmit = (e) =>
    {
        e.preventDefault();
        this.state.submited = true;
        this.validate();

        if(this.isAllValid()){

            const userObject = {
                name: this.state.name,
                username: this.state.username,
                phone_number: this.state.phone_number,
                password: this.state.password
            }

            axios.post(`${SERVER_HOST}/user`, userObject)
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
                        sessionStorage.name = res.data.name
                        sessionStorage.accessLevel = res.data.accessLevel
                    
                        this.setState({isRegistered:true})
                    } 
                }
                else
                {
                    console.log("Record not added")
                }
            }) 
        }
    }

    
    render() 
    {     
        return (
            <div> 
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
                
                    {this.state.isRegistered ? <Redirect to="/DisplayAllCompanies"/> : null} 

                    <h3 className="form-tittle">User Sign In</h3>
                    
                    <div className="form-group">
                        <label className="label-form">Name</label>
                        <input  className = {this.state.isValidName|| !this.state.submited ? "form-control" : "input-form-error"}
                            name = "name"              
                            type = "name"
                            placeholder = "Charles"
                            autoComplete="name"
                            value = {this.state.name}
                            onChange = {this.handleChange}
                            ref = {input => this.inputToFocus = input}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-form">Username</label>  
                        <input  className = {this.state.isValidUsername || !this.state.submited? "form-control" : "input-form-error"}
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
                        <label className="label-form">Phone Number</label>  
                        <input  className = {this.state.isValidphone_number || !this.state.submited ? "form-control" : "input-form-error"}
                            name = "phone_number"              
                            type = "phone_number"
                            placeholder = "123456789"
                            autoComplete="phone_number"
                            value = {this.state.phone_number}
                            onChange = {this.handleChange}
                            ref = {input => this.inputToFocus = input}
                        />
                    </div>

                    <div className="form-group">
                        <label  className="label-form">Password</label> 
                        <input  className = {this.state.isValidPassword|| !this.state.submited ? "form-control" : "input-form-error"}
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
                       

                    <div className="form-group">
                        <label className="label-form">Password Again</label> 
                        <input className = {this.validateConfirmPassword()|| !this.state.submited ? "form-control" : "input-form-error"}   
                            name = "passwordConfirmation"    
                            type = "password"
                            placeholder = "•••••••••••"
                            autoComplete="passwordConfirmation"
                            value = {this.state.passwordConfirmation}
                            onChange = {this.handleChange}
                            ref = {input => this.inputToFocus = input}
                        />
                    </div>
                    

                    <LinkInClass value="Sign In" className="blue-button" onClick={this.handleSubmit} />
                    <Link className="dark-blue-button" to={"/Login"}>Cancel</Link> 
                    <Link className="light-blue-button" to={"/SignInCompany"}>Sign in as a Company</Link> 
                    
                      
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
