import React, {Component} from 'react';


export default class Jumbotron extends Component{
    render(){
        return(
            <div className="jumbotron jumbotron-fluid" style={{backgroundImage:"url(https://filmdaily.co/wp-content/uploads/2021/04/Finance-1.jpg)"}}>
                <div className="container">
                    <h1 className="display-4">Expense Tracker</h1>
                    <hr className="my-4"/>
                    <p>A simple expense tracker web app</p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="/" role="button" style={{marginBottom:"10px"}}>Learn more</a>
                    </p>
                </div>
            </div>
        )
    }
}

