import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"

import LinkInClass from "../components/LinkInClass"


export default class SignInCompany extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            username:"",
            isValidUsername: false,
            name:"",
            isValidName: false,
            phone_number:"",
            isValidPhone_number: false,
            selectedFile:null, 
            isValidImage: false,
            password:"",
            isValidPassword: false,
            passwordConfirmation:"",
            submited:false
        }
    }


    

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    

    fileSelectedHandler = e => 
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
        if(this.state.password.length>5){
            return true;
        }
        return false;
    }

    validateImage(){
        if(this.state.selectedFile!=null){
            return true;
        }
        return false;
    }

    validatePhone_number(){
        if(this.state.password.length>5){
            return true;
        }
        return false;
    }

    validate(){
        this.setState({
            isValidUsername : this.validateUsername(),
            isValidName : this.validateName(),
            isValidPhone_number : this.validatePhone_number(),
            isValidPassword : this.validatePassword(),
            isValidImage : this.validateImage()
       })
        
    }

    isAllValid(){
        return this.state.isValidUsername && this.state.isValidName && this.state.isValidPhone_number && this.state.isValidPassword && this.validateConfirmPassword();
    }

    clickPickImage = (e) =>
    {
        console.log(this.state.name);
        this.fileInput.click();
        
    }

    /*
        Revisar
    */

    handleSubmit = (e) =>
    {
        e.preventDefault();
        this.state.submited = true;
        this.validate();

        if(this.isAllValid()){

            let formData = new FormData()  
            formData.append("profilePhoto", this.state.selectedFile)

            const companyObject = {
                name: this.state.name,
                username: this.state.username,
                phone_number: parseInt(this.state.phone_number, 10),
                password: this.state.password,
                img: formData
            }

            axios.post(`companies.json`,companyObject)//axios.post(`${SERVER_HOST}/api/company`, companyObject)
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
                        console.log("Record added")
                        this.setState({redirectToDisplayAllCars:true})
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
                
                    <h3 className="form-tittle">Sign in as a Company</h3>

                    <div className="form-group">
                    
                        <label className="label-form">Name</label>
                        <input  className = {this.state.isValidName|| !this.state.submited ? "form-control" : "input-form-error"}
                            name = "name"              
                            type = "text"
                            placeholder = "Charles"
                            autoComplete="name"
                            value = {this.state.name}
                            onChange = {this.handleChange}
                            ref = {(input) => { this.inputToFocus = input }} 
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-form">Username</label>  
                        <input  className = {this.state.isValidUsername || !this.state.submited? "form-control" : "input-form-error"}
                            name = "username"              
                            type = "text"
                            placeholder = "CharlesSmith"
                            autoComplete="username"
                            value = {this.state.username}
                            onChange = {this.handleChange}
                        />
                    </div>   
                    
                    <div className="form-group">
                        <label className="label-form">Phone Number</label> 
                        <input className="form-control"// className = {this.state.isValidPhone_number || !this.state.submited ? "input-form" : "input-form-error"}
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
                            //style={{display:'none'}}
                            //name = "image"           
                            type = "file"
                            onChange = {this.fileSelectedHandler}
                            //ref={fileInput => this.fileInput = fileInput}
                        />
                    </div>
                    

                    {/*<button onClick={this.clickPickImage}>Pick Image</button>*/} 
         
                    <div className="form-group">
                        <label  className="label-form">Password</label> 
                        <input  className = {this.state.isValidPassword|| !this.state.submited ? "form-control": "input-form-error"}
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
                        <label className="label-form">Password Again</label> 
                        <input className = {this.validateConfirmPassword()|| !this.state.submited ?  "form-control" : "input-form-error"}   
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
                <br/>    
                <br/>    
            </div>
            
        )
    }
    
}
