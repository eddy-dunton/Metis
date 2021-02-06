import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './App.css';

import Navbar from './Navbar.js';
import Home from './Home.js';
import Modal from './components/Modal.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            loggedIn: false,
            showLogin: false,
            showUpload: false,
            currentTab:'signin'
        };
        this.login = this.login.bind(this);
        this.upload = this.upload.bind(this);
        this.setCurrentTab = this.setCurrentTab.bind(this);
        //https://www.devaradise.com/react-tabs-tutorial
        this.signInTabs = [
            {
                name: 'signin',
                label: 'Sign In',
                content: (
                    <div className="accounts">
                        <label for="username">Username</label>
                        <input type="text" id="username"/>
                        <label for="password">Password</label>
                        <input type="password" id="password"/>
                        <button>SIGN IN</button>
                    </div>
                )
            },
            {
                name: 'create',
                label: 'Create Account',
                content: (
                    <div className="accounts">
                    </div>
                )
            }];
    }

    login(e) {
        console.log(e)
        this.setState({ showLogin: !this.state.showLogin});
    }
    setCurrentTab(cur) {
        this.setState({ currentTab:cur });
    }

    upload() {
        this.setState({ showUpload: !this.state.showUpload });
    }

    //<Route path="/" component={} />
    render() {
        return (
            <div className="app">
                <Navbar username={this.state.username} loggedIn={this.state.loggedIn} uploadCallback={this.upload} loginCallback={this.login} />
                <Modal show={this.state.showLogin} handleClose={this.login}>
                    {/* sets up the tab buttons */}
                    <div className="tabs">
                        {this.signInTabs.map((tab, i) => (
                            <button 
                                key={i}
                                onClick={() => this.setCurrentTab(tab.name)} 
                                className={(tab.name === this.state.currentTab) ? 'active clickable' : 'clickable'}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {/* line below draws signin/create account based on whats picked */}
                    { this.signInTabs.map((tab, i) => {return tab.name === this.state.currentTab ? tab.content : null; })}
                </Modal>
                <Modal show={this.state.showUpload} handleClose={this.upload}>
                    <p>Upload Modal</p>
                </Modal>
                <Switch>
                    <Route path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default App;
