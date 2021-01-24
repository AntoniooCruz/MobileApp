import React, {Component} from "react"
import {Redirect} from "react-router-dom"

import {ACCESS_LEVEL_GUEST} from "../config/global_constants"

export default class Logout extends Component 
{
  
    render() 
    {   
        localStorage._id = ""
        localStorage.username = "GUEST"
        localStorage.accessLevel = ACCESS_LEVEL_GUEST
        localStorage.token = null

        return (
            <div>
                <Redirect to="/Login"/>
            </div>
        )
    }
}
