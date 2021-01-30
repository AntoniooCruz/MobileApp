import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST,ACCESS_LEVEL_COMPANY} from "../../config/global_constants";

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
            oldPassword: "",
            newPasswordConfirmation:"",
            description:"",

            description: "",

            errorMessageList: [],

            selectedFile: null,

            passwordChange:false,

            hasBeenChanged : false
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
                        this.setState({id: res.data._id}) 
                        this.setState({username: res.data.username}) 
                        this.setState({name: res.data.name}) 
                        this.setState({phone_number: res.data.phone_number}) 
                        this.setState({password: res.data.password}) 
                        this.setState({selectedFile: res.data.img})
                        this.setState({description: res.data.description})
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

    handleFileChange = (e) => 
    {
        this.setState({selectedFile: e.target.files[0]})
        console.log(e.target.files[0])
    }


    validateUsername(){
        if(this.state.username.length > 3){
            return true;
        }
        return false;
    }

    validateDescription()
    {    
        if(this.state.description.length>0){
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

    validateSelectedFile(){
        if(this.state.selectedFile!=null){
            return true;
        }
        return false;
    }

    validate(){

        return{
            username: this.validateUsername(),
            name: this.validatePassword(),
            phone_number: this.validatePhone_number(),
            password: this.validatePassword(),
            passwordConfirmation: this.validateConfirmPassword(),
            selectedFile: this.validateSelectedFile(),
            description: this.validateDescription(),
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
        let formData = new FormData()
        formData.append("img",this.state.selectedFile);
        formData.append("username", this.state.username);
        formData.append("name", this.state.name);
        formData.append("phone_number", this.state.phone_number);
        formData.append("description", this.state.description);

        if(inputsAreAllValid){
            if(!this.state.passwordChange){
                formData.append("password", this.state.password);
                axios.put(`${SERVER_HOST}/api/company/${localStorage._id}`, formData)
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
            formData.append("oldpassword", this.state.oldPassword);
            formData.append("newpassword", this.state.newPasswordConfirmation);
            axios.put(`${SERVER_HOST}/api/company/changePassword/${localStorage._id}`, formData)
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
        }
        }
    }

    
    render() 
    {     
        let nameCheck = "";
        let oldPasswordCheck = "";
        let newPasswordConfirmationCheck = "";
        let phone_numberCheck = "";
        let usernameErrorMessage = "";
        let descriptionCheck = "";


        if(this.validateDescription()){
            descriptionCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateName()){
            nameCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validatePassword()){
            oldPasswordCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateConfirmPassword()){
            newPasswordConfirmationCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validatePhone_number()){
            phone_numberCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        return (
            <div> 

                {parseInt(localStorage.accessLevel) === ACCESS_LEVEL_COMPANY  ? null : <Redirect to={"/Login"}/>}
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
                        <label className="label-form">Username</label>  
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

                    <div className="form-group">
                        <label className="label-form">Company Logo</label> 
                            <input className="form-control"
                                name = "img"           
                                type = "file"
                                autoComplete="img"
                                onChange = {this.handleFileChange}
                            />
                    </div>

                    <div className="form-group">
                        <label className="label-form">Description {descriptionCheck}</label>  
                        <input  className = "form-control"
                            name = "description"              
                            type = "decription"
                            placeholder = "Tell us about your company"
                            autoComplete="description"
                            value = {this.state.description}
                            onChange = {this.handleChange}
                        />
                    </div>

                    <LinkInClass value= {this.state.passwordChange ? "No Change Password" : "Change Password"} className="light-blue-button" onClick={this.handleChangePassword} />

                    {this.state.passwordChange ?  

                        <div>
                            <div className="form-group">
                                <label  className="label-form"> Old Password {oldPasswordCheck}</label> 
                                <input  className = "form-control"
                                    name = "newPassword"           
                                    type = "password"
                                    placeholder = "•••••••••••"
                                    autoComplete="newPassword"
                                    title = "Password must be at least 6 digits"
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
                    {this.state.hasBeenChanged ? <p align="center">Changes done successfully</p> : null}
                    <LinkInClass value="Update" className="blue-button" onClick={this.handleSubmit} />

                    {this.state.hasBeenChanged ? <p align="center">Changes done successfully</p> : null}
                      
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
