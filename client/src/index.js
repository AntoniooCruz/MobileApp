import React from "react"
import ReactDOM from "react-dom"
import "./css/index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import Axios from "axios"


Axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()