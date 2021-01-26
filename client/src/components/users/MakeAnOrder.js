import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../../config/global_constants"

import LinkInClass from "../LinkInClass"

import {faBoxTissue, faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class SignIn extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            company_id:"",
            client_id:"",
            product_id: "",
            is_fullfilled: false,
            message: "",
            location: "",

            alreadyOrdered:false
        }
    }


    componentDidMount() 
    {     
        this.inputToFocus.focus()  
        this.setState({company_id: this.props.match.params.companyId})      
        this.setState({client_id: localStorage._id})
        this.setState({product_id: this.props.match.params.productId})

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



    handleSubmit = (e) =>
    {
        e.preventDefault();

        this.validate();

        const formInputsState = this.validate();
        const inputsAreAllValid = Object.keys(formInputsState).every(index => formInputsState[index]);

        if(inputsAreAllValid){

            const orderObject = {
                company_id: this.state.company_id,
                client_id: this.state.client_id,
                product_id: this.state.product_id,
                is_fulfilled: this.state.is_fullfilled,
                message: this.state.message,
                location: this.state.location
            }

            axios.post(`${SERVER_HOST}/api/order`, orderObject)
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
            messageCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        if(this.validateLocation()){
            locationCheck = <FontAwesomeIcon icon={faCheck}/>
        }

        return (
            <div> 
                {localStorage.accessLevel == ACCESS_LEVEL_NORMAL_USER ? null : <Redirect to={"/Login"}/>}
                {this.state.alreadyOrdered ? <Redirect to={"/DisplayAllProducts/" + this.state.company_id}/> : null} 
                <img className="img-logo" src="logo.png" alt=""/>

                <form className="form-container" noValidate = {true} id = "loginOrRegistrationForm">

                    <h3 className="form-tittle">Order Confirmation</h3>

                    <dl>
                        <dt>INSERT PRODUCT NAME</dt>
                        <dd>Insert Price</dd>
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
                    <Link className="dark-blue-button" to={"/DisplayAllProducts/" + this.state.company_id}>Cancel</Link> 
                    
                </form>

                <br/><br/>
            </div>
        )
    }
    
}
