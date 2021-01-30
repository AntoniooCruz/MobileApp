import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"

import LinkInClass from "../LinkInClass"

import {faBoxTissue, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import Menu from './Menu'

export default class SignIn extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            is_fullfilled: false,
            message: "",
            location: "",

            product_name: "",
            product_price: 0,

            alreadyOrdered:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()  
        this.getInfoProduct();

    }

    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }

    validateMessage()
    {    
        if(this.state.message.length>0){
            return true;
        }
        return false;
    }

    validateLocation()
    {
        if(this.state.location.length>0){ /**Revisar */
            return true;
        }
        return false;
    }

    validate(){
        return{
            message: this.validateMessage(),
            location: this.validateLocation()
        };
    }

    getInfoProduct(){

        
        axios.get(`${SERVER_HOST}/api/products/${this.props.match.params.productId}`,{headers: {"auth-token": localStorage.token}})
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

                    console.log(res.data)
                    
                    this.setState({product_name: res.data.name})
                    this.setState({product_price: res.data.price})
                }   
            }
            else
            {
                console.log("Record not found")
            }
        })
        
    }



    handleSubmit = (e) =>
    {
        e.preventDefault();

        

        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);


        
        if(inputsAreAllValid){

            const orderObject = {
                company_id: this.props.match.params.companyId,
                client_id: localStorage._id,
                product_id: this.props.match.params.productId,
                is_fulfilled: this.state.is_fullfilled,
                message: this.state.message,
                location: this.state.location
            }

            axios.post(`${SERVER_HOST}/api/order`, orderObject,{headers: {"auth-token": localStorage.token}})
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
                        console.log("Order added")                        
                        this.setState({alreadyOrdered:true})

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

        

        let messageCheck = "";
        let locationCheck = "";

        if(this.validateMessage()){
            messageCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        if(this.validateLocation()){
            locationCheck = <FontAwesomeIcon className="green-icon" icon={faCheck}/>
        }

        return (
            <div>
                {(parseInt(localStorage.accessLevel) === ACCESS_LEVEL_NORMAL_USER || parseInt(localStorage.accessLevel) === ACCESS_LEVEL_ADMIN) ? null : <Redirect to={"/Login"}/>}
                <Menu/> 
                
                {this.state.alreadyOrdered ? <Redirect to={"/DisplayAllProducts/" + this.state.company_id}/> : null} 
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

                    <h3 className="form-tittle">Order Confirmation</h3>

                    <dl>
                        <dt>Product: {this.state.product_name}</dt>
                        <dd>Price: {this.state.product_price}   zl</dd>
                    </dl>
                    
                    <div className="form-group">
                        <label className="label-form">Message {messageCheck}</label>

                        <input  className = "form-control"
                            name = "message"              
                            type = "message"
                            placeholder = "Next to the life guard "
                            autoComplete="message"
                            value = {this.state.message}
                            onChange = {this.handleChange}
                            ref = {input => this.inputToFocus = input}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label-form">Location {locationCheck}</label>  
                        <input  className = "form-control"
                            name = "location"              
                            type = "location"
                            placeholder = "-41.5592, 79.7499"
                            autoComplete="location"
                            value = {this.state.location}
                            onChange = {this.handleChange}
                        />
                    </div>

                    <LinkInClass value="Finish and Pay" className="blue-button" onClick={this.handleSubmit} />
                    <LinkInClass value="Finish and Pay on Delivery" className="blue-button" onClick={this.handleSubmit} />
                    <Link className="dark-blue-button" to={"/DisplayAllProducts/" + this.props.match.params.companyId}>Cancel</Link> 
                    
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
