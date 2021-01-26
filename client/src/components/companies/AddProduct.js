import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import axios from "axios"

import {SERVER_HOST} from "../../config/global_constants"

import LinkInClass from "../LinkInClass"

import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class SignIn extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            name:"",
            price:"",

            alreadyAdded:false
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

    validateName()
    {    
        if(this.state.name.length>0){
            return true;
        }
        return false;
    }

    validatePrice()
    {
        if(this.state.price.length>0 && this.state.price.match(/^[0-9]+$/)){
            return true;
        }
        return false;
    }

    validate(){
        return{
            name: this.validateName(),
            price: this.validatePrice()
        };
    }



    handleSubmit = (e) =>
    {
        e.preventDefault();

        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);


        if(inputsAreAllValid){

            const productObject = {
                company_id: localStorage._id,
                name: this.state.name,
                price: this.state.price,//price: parseFloat(this.state.price),
                is_available: true,
            }

            axios.post(`${SERVER_HOST}/api/products`, productObject)
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
                        console.log("Product added")                        
                        this.setState({alreadyAdded:true})

                    } 
                }
                else
                {
                    console.log("Record not added")
                }
            })
        }
    }

    oneKeyPressFunction = (e) =>
    {

        if(e.charCode == 13){
            this.handleSubmit()
        }
    }

    render() 
    {     

        let nameCheck = "";
        let priceCheck = "";

        if(this.validateName()){
            nameCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validatePrice()){
            priceCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        return (
            <div> 
                {this.state.alreadyAdded ? <Redirect to="/ProductsCompany"/> : null} 
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

                    <h3 className="form-tittle">New product</h3>
                    
                    <div className="form-group">
                        <label className="label-form">Name {nameCheck}</label>

                        <input  className = "form-control"
                            name = "name"              
                            type = "name"
                            placeholder = "Coca-Cola"
                            autoComplete="name"
                            value = {this.state.name}
                            onChange = {this.handleChange}
                            ref = {input => this.inputToFocus = input}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-form">Price {priceCheck}</label>  
                        <input  className = "form-control"
                            name = "price"              
                            type = "price"
                            placeholder = "6"
                            autoComplete="price"
                            value = {this.state.price}
                            onChange = {this.handleChange}
                        />
                    </div>

                    <LinkInClass value="Add new product" className="blue-button" onClick={this.handleSubmit} />
                    <Link className="dark-blue-button" to={"/ProductsCompany/"}>Cancel</Link> 
                    
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
