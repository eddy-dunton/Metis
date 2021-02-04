import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './App.css';

import Navbar from './Navbar.js';
import Home from './Home.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            loggedIn:false,
        };
        this.login = this.login.bind(this);
        this.upload = this.upload.bind(this);
    }

    login() {
        /* TODO: create login modal and activate it when this is called*/  
    }


    upload() {
        /* TODO: create upload modal and activate it when this is called*/  
    }

    //<Route path="/" component={} />
    render() {
        return (
            <div className="app">
                <Navbar username={this.state.username} loggedIn={this.state.loggedIn} uploadCallback={this.upload} loginCallback={this.login} />
                <Switch>
                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default App;
