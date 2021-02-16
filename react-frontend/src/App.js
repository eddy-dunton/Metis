import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './App.css';

import Navbar from './Navbar.js';
import Home from './Home.js';
import Reset from './reset-password.js';
import Modal from './components/Modal.js';
import Profile from './Profile.js';
import UploadArea from './components/UploadArea.js';

const bcrypt = require("bcryptjs")

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: null,
            loggedIn: false,
            showLogin: false,
            showUpload: false,
            currentTab:'signin'
        };
        this.login = this.login.bind(this);
        this.upload = this.upload.bind(this);
        this.fileUploaded = this.fileUploaded.bind(this);
        this.setCurrentTab = this.setCurrentTab.bind(this);
        this.signin = this.signin.bind(this);
        this.hashPassword = this.hashPassword.bind(this);
        this.createAccount = this.createAccount.bind(this);
        //https://www.devaradise.com/react-tabs-tutorial
        this.signInTabs = [
            {
                name: 'signin',
                label: 'Sign In',
                content: (
                    <div className="accounts">
                        <div className="input">
                            <div>Email or Username</div>
                            <input type="text" id="username"/>
                        </div>
                        <div className="input">
                            <div>Password</div>
                            <input type="password" id="password"/>
                            <Link to="/reset-password" onClick={this.login}>Reset Password</Link>
                        </div>
                        <button onClick={this.signin} className="clickable hover">SIGN IN</button>
                    </div>
                )
            },
            {
                name: 'create',
                label: 'Create Account',
                content: (
                    <div className="accounts">
                        <div className="input">
                            <div>Username</div>
                            <input type="text" id="username"/>
                        </div>
                        <div className="input">
                            <div>Email</div>
                            <input type="text" id="email"/>
                        </div>
                        <div className="input">
                            <div>Password</div>
                            <input type="password" id="password"/>
                        </div>
                        <button  onClick={this.createAccount}className="clickable hover">CREATE ACCOUNT</button>
                    </div>
                )
            }
        ];
    }

    async hashPassword(password){
        this.saltRounds = 24; 
        this.hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, this.saltRounds, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        return this.hashedPassword
    }

    setCurrentTab(cur) {
        this.setState({ currentTab:cur });
    }

    async createAccount (e){
        this.user = {
            username : document.getElementById("username").value,
            email : document.getElementById("email").value,
            passwordHash : this.hashPassword(document.getElementById("password").value)
        }
        let response = await fetch('/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.user)
        });
        console.log(await response.json())
        this.login()
    }

    async signin(e){
        this.user = {
            username : document.getElementById("username").value,
            passwordHash :this.hashPassword(document.getElementById("password").value)
        }
        let response = await fetch('/isUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(this.user)
        });
        console.log(await response.json())
        this.login()
    }

    login(e) {
        this.setState({ showLogin: !this.state.showLogin});
    }

    upload() {
        this.setState({ showUpload: !this.state.showUpload });
    }

    fileUploaded(files) {
        if (files){
            if (files.length !== 0){
                /* TODO do someting with file*/
                //probably something useful here
                //https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
                //https://attacomsian.com/blog/uploading-files-using-fetch-api -- fetch is so op
                for(var i=0;i<files.length;i++){
                    console.log(files[i])
                    console.log(URL.createObjectURL(files[i]))
                }
            }
        }
    };

    //<Route path="/" component={} />
    render() {
        return (
            <div className="app">
                <Navbar token={this.state.token} loggedIn={this.state.loggedIn} uploadCallback={this.upload} loginCallback={this.login} />
                {/* modal is initially hidden and shown when this.login is called */}
                <Modal show={this.state.showLogin} handleClose={this.login}>
                    {/* sets up the tab buttons */}
                    <div className="tabs">
                        {this.signInTabs.map((tab, i) => (
                            <button 
                                key={i}
                                onClick={() => this.setCurrentTab(tab.name)} 
                                className={`clickable ${(tab.name === this.state.currentTab) ? 'active' : ''}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    {/* line below draws signin/create account based on whats picked */}
                    { this.signInTabs.find(tab => tab.name === this.state.currentTab).content}
                </Modal>
                {/* modal is initially hidden and shown when this.upload is called */}
                <Modal className={"uploadModal"} show={this.state.showUpload} handleClose={this.upload}>
                    <UploadArea handleDrop={this.fileUploaded} filetype="PDF" />
                </Modal>
                {/* part of react router handles different paths given to it */}
                <Switch>
                    <Route path="/reset-password" component={Reset} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
