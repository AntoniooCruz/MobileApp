import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"

import LinkInClass from "../components/LinkInClass"

import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default class SignInCompany extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            username:"",
            name:"",
            phone_number:"",
            selectedFile:null,
            password:"",
            passwordConfirmation:"",

            alreadyRegistered:false
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

    fileSelectedHandler = (e) => 
    {
       this.setState({
            selectedFile: e.target.files[0]
       })
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
        if(this.state.password.length>=8){
            return true;
        }
        return false;
    }

    validatePhone_number(){
        if(this.state.phone_number.length>=3){
            return true;
        }
        return false;
    }

    validateSelectedFile(){
        if(this.state.selectedFile!=null){
            return true;
        }
        return false;
    }

    validate(){
        const username = this.state.username;
        const name = this.state.name;
        const phone_number = this.state.phone_number;
        const password = this.state.password;
        const selectedFile = this.state.selectedFile;

        return{
            username: this.validateUsername(),
            name: this.validatePassword(),
            phone_number: this.validatePhone_number(),
            password: this.validatePassword(),
            passwordConfirmation: this.validateConfirmPassword(),
            selectedFile: this.validateSelectedFile()
        };
    }



    handleSubmit = (e) =>
    {
        e.preventDefault();

        this.state.submited = true;
        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        if(inputsAreAllValid){

            const userObject = {
                name: this.state.name,
                username: this.state.username,
                phone_number: this.state.phone_number,
                password: this.state.password,
                img: this.selectedFile
            }

            axios.post(`${SERVER_HOST}/api/user`, userObject)
            .then(res => 
            {   
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.errorMessage) 
                        //If there´s error 400, then this.setState({alreadyRegistered:true})
                    }else
                    {   
                        console.log("User registered and logged in")

                        localStorage._id = res.data.id
                        localStorage.username = res.data.username
                        localStorage.accessLevel = ACCESS_LEVEL_GUEST//res.data.accessLevel                    
                        localStorage.token = res.data.token
                        
                        this.setState({alreadyRegistered:true})

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
        //const formInputsState = this.validate();
        //const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        let usernameCheck = "";
        let nameCheck = "";
        let passwordCheck = "";
        let passwordConfirmationCheck = "";
        let phone_numberCheck = "";
        let selectedFileCheck = "";


        if(this.validateUsername()){
            usernameCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateName()){
            nameCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validatePassword()){
            passwordCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateConfirmPassword()){
            passwordConfirmationCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validatePhone_number()){
            phone_numberCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateSelectedFile()){
            selectedFileCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        return (
            <div> 
                {this.state.alreadyRegistered ? <Redirect to="/MainCompany"/> : null} 
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

                    <h3 className="form-tittle">User Sign In</h3>
                    
                    <div className="form-group">
                        <label className="label-form">Name {nameCheck}</label>

                        <input  className = "form-control"
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
                        <label className="label-form">Username {usernameCheck}</label>  
                        <input  className = "form-control"
                            name = "username"              
                            type = "username"
                            placeholder = "CharlesSmith"
                            autoComplete="username"
                            value = {this.state.username}
                            onChange = {this.handleChange}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label className="label-form">Phone Number {phone_numberCheck}</label>  
                        <input  className = "form-control"
                            name = "phone_number"              
                            type = "phone_number"
                            placeholder = "123456789"
                            autoComplete="phone_number"
                            value = {this.state.phone_number}
                            onChange = {this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-form">Company Logo</label> 
                            <input className="form-control"
                                name = "selectedFile"           
                                type = "file"
                                autoComplete="selectedFile"
                                onChange = {this.fileSelectedHandler}
                            />
                    </div>

                    <div className="form-group">
                        <label  className="label-form">Password {passwordCheck}</label> 
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
                       

                    <div className="form-group">
                        <label className="label-form">Password Again {passwordConfirmationCheck}</label> 
                        <input className = "form-control"  
                            name = "passwordConfirmation"    
                            type = "password"
                            placeholder = "•••••••••••"
                            autoComplete="passwordConfirmation"
                            value = {this.state.passwordConfirmation}
                            onChange = {this.handleChange}
                        />
                    </div>

                    <LinkInClass value="Sign In" className="blue-button" onClick={this.handleSubmit} />
                    <Link className="dark-blue-button" to={"/Login"}>Cancel</Link> 
                    <Link className="light-blue-button" to={"/SignIn"}>Sign in as a user</Link>  
                    
                </form>

                <br/><br/>
            </div>
        )
    }
    
}

