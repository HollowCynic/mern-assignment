import React, {Component} from 'react';
import {Button} from 'react-bootstrap'


export default class Jumbotron2 extends Component{

    render(){
        return(
            <div className="jumbotron jumbotron-fluid" style={{backgroundImage:"url(https://filmdaily.co/wp-content/uploads/2021/04/Finance-1.jpg)"}}>
                <div className="container">
                    <h1 className="display-4">{this.props.header}</h1>
                    <hr className="my-4"/>
                    <p style={{paddingBottom:"25px"}}>{this.props.description}</p>
                </div>
            </div>
        )
    }
}

