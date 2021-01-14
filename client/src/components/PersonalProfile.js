import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import LinkInClass from "../components/LinkInClass"

import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class PersonalProfile extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
           user = null
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()     
        /*
            Where´s the id? we have to create the user_id?
        */
        axios.get(`${SERVER_HOST}/user/${user_id}`)
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
                    this.setState({user: res.data}) 
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
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

    validate(){
        const username = this.state.username;
        const name = this.state.name;
        const phone_number = this.state.phone_number;
        const password = this.state.password;
        const passwordConfirmation = this.state.passwordConfirmation;

        return{
            username: this.validateUsername(),
            name: this.validatePassword(),
            phone_number: this.validatePhone_number(),
            password: this.validatePassword(),
            passwordConfirmation: this.validateConfirmPassword()
        };
    }

    isRegistered(){
        return  this.state.isRegistered;
    }



    handleSubmit = (e) =>
    {
        this.state.submited = true;
        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        if(inputsAreAllValid){

            const userObject = {
                name: this.state.name,
                username: this.state.username,
                phone_number: parseInt(this.state.phone_number, 10),
                password: this.state.password
            }

            axios.get(`${SERVER_HOST}/user`, userID)
            .then(res => 
            {  
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log("hola")    
                    }
                    else
                    {           
                        console.log("Records read")   
                        this.setState({companies: res.data}) 
                    }   
                }
                else
                {
                    console.log("Record not found")
                }
            }) 
        }else{
            e.preventDefault();
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
        let usernameErrorMessage = "";


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

        if(this.isRegistered()){
            usernameErrorMessage = <label className="label-form-error">Invalid username</label>
        }

        return (
            <div> 
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">
                
                    {/*{this.state.isRegistered ? <Redirect to="/DisplayAllCompanies"/> : null} }*/}

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
                    

                    <LinkInClass value="Change" className="blue-button" onClick={this.handleSubmit()} />
                    <Link className="dark-blue-button" to={"/Main"}>Cancel</Link>  {/* va al main de displayallcompanies */}
                    
                      
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
