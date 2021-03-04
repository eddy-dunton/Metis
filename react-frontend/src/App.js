import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import Cookies from 'universal-cookie';

import sha256 from 'crypto-js/sha256';

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './App.css';

import Navbar from './Navbar.js';
import Home from './Home.js';
import Reset from './reset-password.js';
import Modal from './components/Modal.js';
import Profile from './Profile.js';
import UploadArea from './components/UploadArea.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.state = {
            token: this.cookies.get('token'),
            username: this.cookies.get('username'),
            loggedIn: this.cookies.get('token') ? true : false,
            showLogin: false,
            showUpload: false,
            currentTab:'signin'
        };

        this.login = this.login.bind(this);
        this.upload = this.upload.bind(this);
        this.fileUploaded = this.fileUploaded.bind(this);
        this.setCurrentTab = this.setCurrentTab.bind(this);
        this.failedRequest = this.failedRequest.bind(this);
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
                            <input type="text" defaultValue="" id="username"/>
                            <div className="error-message"></div>
                        </div>
                        <div className="input">
                            <div>Password</div>
                            <input type="password" defaultValue=""  id="password"/>
                            <div className="error-message"></div>
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
                            <input type="text" defaultValue="" id="username"/>
                            <div className="error-message"></div>
                        </div>
                        <div className="input">
                            <div>Email</div>
                            <input type="text" defaultValue="" id="email"/>
                            <div className="error-message"></div>
                        </div>
                        <div className="input">
                            <div>Password</div>
                            <input type="password" defaultValue="" id="password"/>
                            <div className="error-message"></div>
                        </div>
                        <button  onClick={this.createAccount}className="clickable hover">CREATE ACCOUNT</button>
                    </div>
                )
            }
        ];
    }

    async hashPassword(password){
        let hashedPassword = sha256(password)
        return hashedPassword.toString()
    }

    setCurrentTab(cur) {
        this.inputs = [document.getElementById("username"),document.getElementById("password")]
        if (document.getElementById("email")){
            this.inputs.push(document.getElementById("email"))
        }
        this.inputs.forEach(x => {
            x.value = ""
            x.nextElementSibling.innerHTML = "";
            x.classList.remove("input-success")
            x.classList.remove("input-error")
        })
        this.setState({ currentTab:cur });
    }

    error(element, err) {
        element.classList.add("input-error")
        element.classList.remove("input-success")
        element.nextElementSibling.innerHTML = err;
    }

    fine(element) {
        element.classList.add("input-success")
        element.classList.remove("input-error")
        element.nextElementSibling.innerHTML = "";
    }

    async createAccount (e){
        this.username = document.getElementById("username").value
        let isErr = false;
        if (!this.username.match(/^[\w]{1,32}$/)){
            this.error(document.getElementById("username"), "username should be less than 32 characters long.");
            isErr = true;
        } else {
            this.fine(document.getElementById("username"));
        }
        this.email = document.getElementById("email").value
        if (!this.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.ac\.uk/)){
            this.error(document.getElementById("email"), "email not valid form.");
            isErr = true;
        } else {
            this.fine(document.getElementById("email"));
        }

        this.password = document.getElementById("password").value
        if (!this.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)){
            this.error(document.getElementById("password"), "password should be 8 characters, have atleast 1 lower and upper case letter, a number and a special character");
            isErr = true;
        } else {
            this.fine(document.getElementById("password"));
        }
        if (isErr){
            return
        }
        let user = {
            username : this.username,
            email : this.email,
            passwordHash : await this.hashPassword(this.password)
        }
        let response = await fetch('/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        let resjson = await response.json()
        if (resjson.error){
            let displayedError = false
            if (resjson.error.toLowerCase().includes("password")){
                this.error(document.getElementById("password"),resjson.error)
                displayedError = true
            }
            if (resjson.error.toLowerCase().includes("email")){
                this.error(document.getElementById("email"),resjson.error)
                displayedError = true
            }
            if (resjson.error.toLowerCase().includes("username")){
                this.error(document.getElementById("username"),resjson.error)
                displayedError = true
            }
            if (!displayedError){
                this.error(document.getElementById("username"),resjson.error)
                this.error(document.getElementById("password"),resjson.error)
            }
        } else {
            this.setState({ token: resjson.token, username:this.username, loggedIn : true});
            this.cookies.set('token', resjson.token, { path: '/' });
            this.cookies.set('username', this.username, { path: '/' });
            this.login()
        }
    }

    async signin(e){
        let user = {
            username : document.getElementById("username").value,
            passwordHash :await this.hashPassword(document.getElementById("password").value)
        }
        let response = await fetch('/isUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        let resjson = await response.json()
        if (resjson.error){
            let displayedError = false
            if (resjson.error.toLowerCase().includes("password")){
                this.error(document.getElementById("password"),resjson.error)
                displayedError = true
            }
            if (resjson.error.toLowerCase().includes("username")){
                this.error(document.getElementById("username"),resjson.error)
                displayedError = true
            }
            if (!displayedError){
                this.error(document.getElementById("username"),resjson.error)
                this.error(document.getElementById("password"),resjson.error)
            }
        } else {
            this.setState({ token: resjson.token, username:resjson.username,loggedIn : true});
            this.cookies.set('token', resjson.token, { path: '/' });
            this.cookies.set('username', resjson.username, { path: '/' });
            this.login()
        }
    }

    failedRequest(){
        this.setState({ token:'' , username: '', loggedIn: false});
        this.cookies.remove('username')
        this.cookies.remove('token') 
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
                <Navbar token={this.state.token} failCallback={this.failedRequest} username={this.state.username} loggedIn={this.state.loggedIn} uploadCallback={this.upload} loginCallback={this.login} />
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
                    <Route path="/profile/:username" render={(data) => <Profile token={this.state.token} failCallback={this.failedRequest} username={data.match.params.username} loggedIn={this.state.loggedIn}/>}/>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
