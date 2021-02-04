import React from 'react';
import './App.css';

import Navbar from './Navbar.js';

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

    render() {
        return (
            <div className="app">
                <Navbar username={this.state.username} loggedIn={this.state.loggedIn} uploadCallback={this.upload} loginCallback={this.login} />
            </div>
        );
    }
}

export default App;
