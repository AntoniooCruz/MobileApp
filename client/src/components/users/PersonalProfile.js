import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {ACCESS_LEVEL_COMPANY, SERVER_HOST} from "../../config/global_constants"

import LinkInClass from "../LinkInClass"

import {faCheck, faLessThan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Menu from './Menu';

export default class PersonalProfile extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            id: "",
            name:"",
            username:"",
            password:"",
            phone_number:"",
            oldPassword: "",
            newPasswordConfirmation:"",
            access_level: null,

            passwordChange:false,

            errorMessageList: [],

            hasBeenChanged : false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus() 
        axios.get(`${SERVER_HOST}/api/user/${localStorage._id}`,{headers: {"auth-token": localStorage.token}})
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
                        this.setState({id: res.data._id}) 
                        this.setState({username: res.data.username}) 
                        this.setState({name: res.data.name}) 
                        this.setState({phone_number: res.data.phone_number}) 
                        this.setState({password: res.data.password}) 
                        this.setState({is_admin: res.data.is_admin})

                    }   
                }
                else
                {
                    console.log("Record not found")
                }
            }
        )
    }

    handleChange = (e) => 
    {
        this.setState({hasBeenChanged: false})
        this.setState({[e.target.name]: e.target.value})
    }

    validateUsername(){
        if(this.state.username.length > 3){
            return true;
        }
        return false;
    }
    validateConfirmPassword()
    {    
        return (this.state.newPasswordConfirmation.length >= 6 || !this.state.passwordChange); 
    }

    validateName()
    {    
        if(this.state.name.length>3 && this.state.name.length<20){
            return true;
        }
        return false;
    }

    validatePassword(){
        if(this.state.oldPassword.length>=6 || !this.state.passwordChange){
            return true;
        }
        return false;
    }

    validatePhone_number(){
        if(this.state.phone_number.length>0 && this.state.phone_number.match(/^[0-9]+$/) && this.state.phone_number.length <= 13){
            return true;
        }
        return false;
    }

    validate(){
        const username = this.state.username;
        const name = this.state.name;
        const phone_number = this.state.phone_number;
        const oldPassword = this.state.oldPassword;
        const newPasswordConfirmation = this.state.newPasswordConfirmation;

        return{
            username: this.validateUsername(),
            name: this.validateName(),
            phone_number: this.validatePhone_number(),
            password: this.validatePassword(),
            passwordConfirmation: this.validateConfirmPassword()
        };
    }

    handleChangePassword = () => {
        this.setState({passwordChange: !this.state.passwordChange})
    }



    handleSubmit = (e) =>
    {
        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        let errorMessageList = []

        const userModel = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            phone_number: this.state.phone_number,
            is_admin: this.state.is_admin
        }

        if(inputsAreAllValid){

            if(!this.state.passwordChange){
                axios.put(`${SERVER_HOST}/api/user/${localStorage._id}`, userModel)
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
                            localStorage.username = res.data.username
                            this.setState({hasBeenChanged: true})
                        }   
                    }
                    else
                    {
                        console.log("Error")
                    }
                }) 
            } else {
                const changePassword = {
                    id: localStorage._id,
                    username: this.state.username,
                    name: this.state.name,
                    old_password: this.state.oldPassword,
                    new_password: this.state.newPasswordConfirmation,
                    phone_number: this.state.phone_number,
                    is_admin: this.state.is_admin
                }

                axios.put(`${SERVER_HOST}/api/user/changePassword/${localStorage._id}`, changePassword)
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
                            localStorage.username = res.data.username
                            this.setState({hasBeenChanged: true})
                        }   
                    }
                    else
                    {
                        console.log("Error");
                    }
                }).catch((error) => {
                    errorMessageList.push("Server error");
                }) 
            }
        }else{
            if(this.state.name.length<=0){
                errorMessageList.push("Name field empty")
            }
            if(this.state.name.length>20){
                errorMessageList.push("Name max size: 20 char.")
            }
            if(this.state.phone_number.length<=0){
                errorMessageList.push("Phone Number field empty")
            }
            if(!this.state.phone_number.match(/^[0-9]+$/)){
                errorMessageList.push("Phone number no valid")
            }
            if(this.state.phone_number.length>13){
                errorMessageList.push("Phone Number max size: 13 char.")
            }
            if(this.state.password.length<6){
                errorMessageList.push("Password min size: 6 char.")
            }
            if(!(this.state.passwordConfirmation === this.state.password)){
                errorMessageList.push("Passwords don´t match")
            }
        }

        this.setState({errorMessageList: errorMessageList})
    }

    
    render() 
    {     
        
        let usernameCheck = "";
        let nameCheck = "";
        let oldPasswordCheck = "";
        let newPasswordConfirmationCheck = "";
        let phone_numberCheck = "";

        if(this.validateUsername()){
            usernameCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validateName()){
            nameCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validatePassword()){
            oldPasswordCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validateConfirmPassword()){
            newPasswordConfirmationCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validatePhone_number()){
            phone_numberCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        return (
            <div> 
                {parseInt(localStorage.accessLevel) === ACCESS_LEVEL_COMPANY ? <Redirect to={"/Login"}/> : null}
                <Menu/>
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

                    <h3 className="form-tittle">Personal Profile</h3>
                    
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
                    <fieldset disabled>
                    <div className="form-group">
                        <label className="label-form">Username{usernameCheck}</label>  
                        <input  className = "form-control"
                            name = "username"              
                            type = "username"
                            placeholder = "CharlesSmith"
                            autoComplete="username"
                            value = {this.state.username}
                            onChange = {this.handleChange}
                        />
                    </div>
                    </fieldset>
                    
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

                    <LinkInClass value= {this.state.passwordChange ? "No Change Password" : "Change Password"} className="light-blue-button" onClick={this.handleChangePassword} />

                    {this.state.passwordChange ?  

                        <div>
                            <div className="form-group">
                                <label  className="label-form">Old Password {oldPasswordCheck}</label> 
                                <input  className = "form-control"
                                    name = "oldPassword"           
                                    type = "password"
                                    placeholder = "•••••••••••"
                                    autoComplete="oldPassword"
                                    title = "Password must be at least 6 digits long"
                                    value = {this.state.oldPassword}
                                    onChange = {this.handleChange}
                                />
                            </div>  
                            

                            <div className="form-group">
                                <label className="label-form">New Password {newPasswordConfirmationCheck}</label> 
                                <input className = "form-control"  
                                    name = "newPasswordConfirmation"    
                                    type = "password"
                                    placeholder = "•••••••••••"
                                    autoComplete="newPasswordConfirmation"
                                    value = {this.state.newPasswordConfirmation}
                                    onChange = {this.handleChange}
                                />
                            </div>
                        </div>

                    : null

                    }

                    {this.state.errorMessageList.map((errorMessage) => <p className="error-message" >{errorMessage}</p>)}


                    <LinkInClass value="Update" className="blue-button" onClick={this.handleSubmit} />
                    {this.state.hasBeenChanged ? <p align="center">Changes done successfully</p> : null}
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
