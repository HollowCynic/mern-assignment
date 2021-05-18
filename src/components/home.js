import React, {Component} from 'react';
import {Button} from 'react-bootstrap'

import Navbar from "./navbar.components"
import Jumbotron from "./jumbotron.components"


export default class Home extends Component{
    /*
    componentDidMount(){
        document.body.style.background="#aab1bd";
    }*/
    render(){
        return(
            <div style={{width:"100%", margin:"auto"}}>
            <Navbar/>
            <Jumbotron/>
            <div style={{margin:"30px", background:"rgba(0,0,0,0.5)", color:"white", padding:"15px"}}>
                <h1 className="textborder">A Simple Web App For Money Management</h1>
                <hr className="my-4"/>
                <h2>With this app you can register and keep track of your expenses by recording
                    their date, description, and dollar amount. You can easily see the sum
                    of your entered expenses. Moreover, the mern project provides links to resources for
                    money management and tax bracket calculation.
                </h2>
            </div>
            </div>
        )
    }
}

