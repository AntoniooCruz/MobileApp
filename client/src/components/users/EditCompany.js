import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../../config/global_constants";

import LinkInClass from "../LinkInClass"

import {faCheck, faLessThan} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Menu from "../users/Menu"

export default class EditCompany extends Component 
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
            description: "",

            selectedFile: null,

            errorMessageList: [],

            hasBeenChanged: false
        }
    }


    componentDidMount() 
    {     
        const company_id = this.props.match.params.companyId
        this.inputToFocus.focus() 
        axios.get(`${SERVER_HOST}/api/company/${company_id}`,{headers: {"auth-token": localStorage.token}})
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

    validateName()
    {    
        if(this.state.name.length>0){
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

    validate(){

        return{
            name: this.validateName(),
            phone_number: this.validatePhone_number(),
        };
    }



    handleSubmit = (e) =>
    {
        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        let errorMessageList = [];

        const companyModel = {
            username: this.state.username,
            name: this.state.name,
            password: this.state.password,
            phone_number: this.state.phone_number,
            img: this.state.selectedFile,
            description: this.state.description
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
                        this.setState({hasBeenChanged: true})
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
        }

        this.setState({errorMessageList:errorMessageList});
    }

    
    render() 
    {     

        let nameCheck = "";
        let phone_numberCheck = "";


        if(this.validateName()){
            nameCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }


        if(this.validatePhone_number()){
            phone_numberCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        return (
            <div> 

                {parseInt(localStorage.accessLevel) === ACCESS_LEVEL_ADMIN ? null : <Redirect to={"/DisplayAllCompanies"}/>}

                <Menu/>

                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

                    <h3 className="form-tittle">Edit company profile</h3>
                    
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
                        <label className="label-form">Description {<FontAwesomeIcon className="green-icon" icon={faCheck}/>}</label>  
                        <input  className = "form-control"
                            name = "description"              
                            type = "description"
                            placeholder = "Insert description"
                            autoComplete="description"
                            value = {this.state.description}
                            onChange = {this.handleChange}
                        />
                    </div>

                    {this.state.errorMessageList.map((errorMessage) => <p className="error-message" >{errorMessage}</p>)}

                    <LinkInClass value="Update" className="blue-button" onClick={this.handleSubmit} />
                    <Link className="dark-blue-button" to="/DisplayAllCompanies">Back</Link>

                    {this.state.hasBeenChanged ? <p align="center">Changes done successfully</p> : null}
                      
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
