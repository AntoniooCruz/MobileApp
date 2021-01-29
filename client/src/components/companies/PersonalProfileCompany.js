import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../../config/global_constants";

import LinkInClass from "../LinkInClass"

import {faCheck, faLessThan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import MenuCompany from "./MenuCompany.js"

export default class PersonalProfileCompany extends Component 
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
            newPassword: "",
            newPasswordConfirmation:"",

            errorMessageList: [],

            selectedFile: null,

            passwordChange:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus() 
        axios.get(`${SERVER_HOST}/api/company/${localStorage._id}`,{headers: {"auth-token": localStorage.token}})
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
                        this.setState({id: res.data.id}) 
                        this.setState({username: res.data.username}) 
                        this.setState({name: res.data.name}) 
                        this.setState({phone_number: res.data.phone_number}) 
                        this.setState({password: res.data.password}) 
                        this.setState({selectedFile: res.data.img})
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
        return (this.state.newPassword === this.state.newPasswordConfirmation || !this.state.passwordChange); 
    }

    validateName()
    {    
        if(this.state.name.length>0){
            return true;
        }
        return false;
    }

    validatePassword(){
        if(this.state.newPassword.length>=8){
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
        const newPassword = this.state.newPassword;
        const newPasswordConfirmation = this.state.newPasswordConfirmation;
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

    handleChangePassword = () => {
        this.setState({passwordChange: !this.state.passwordChange})
    }



    handleSubmit = (e) =>
    {
        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        let passwordAux = "";

        let errorMessageList = "";

        if(this.state.passwordChange){
            passwordAux = this.state.newPassword;
        }else{
            passwordAux = this.state.password;
        }

        const companyModel = {
            username: this.state.username,
            name: this.state.name,
            password: passwordAux,
            phone_number: this.state.phone_number,
            img: this.state.selectedFile
        }

        if(inputsAreAllValid){

            axios.put(`${SERVER_HOST}/api/company/${this.state.id}`, companyModel,{headers: {"auth-token": localStorage.token}})
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
                    }   
                }
                else
                {
                    console.log("Error")
                }
            }).catch((error) => {
                errorMessageList.push("Server error")
            })
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
            if(this.state.passwordConfirmation === this.state.password){
                errorMessageList.push("Passwords don´t match")
            }
        }

        this.setState({errorMessageList:errorMessageList});
    }

    
    render() 
    {     
        //const formInputsState = this.validate();
        //const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        let usernameCheck = "";
        let nameCheck = "";
        let newPasswordCheck = "";
        let newPasswordConfirmationCheck = "";
        let phone_numberCheck = "";
        let usernameErrorMessage = "";

        if(this.validateUsername()){
            usernameCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateName()){
            nameCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validatePassword()){
            newPasswordCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateConfirmPassword()){
            newPasswordConfirmationCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validatePhone_number()){
            phone_numberCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        return (
            <div> 
                <MenuCompany/>

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
                            disable= {true}
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
                                <label  className="label-form">Password {newPasswordCheck}</label> 
                                <input  className = "form-control"
                                    name = "newPassword"           
                                    type = "password"
                                    placeholder = "•••••••••••"
                                    autoComplete="newPassword"
                                    title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                                    value = {this.state.newPassword}
                                    onChange = {this.handleChange}
                                />
                            </div>  
                            

                            <div className="form-group">
                                <label className="label-form">Password Again {newPasswordConfirmationCheck}</label> 
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
                      
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
