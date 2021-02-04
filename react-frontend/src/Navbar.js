import React from 'react';
import logo from './images/logo.svg';
import upload from './images/upload.svg';
import search from './images/search.svg';

import { Link } from 'react-router-dom'

import './App.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profile: null,
            username:props.username,
            loggedIn:props.loggedIn,
        };

        this.loginCallback = props.loginCallback;
        this.uploadCallback = props.uploadCallback;
        this.getProfileInfo = this.getProfileInfo.bind(this);
    }
    async getProfileInfo() {
        if (this.state.loggedIn){
            //const response = await fetch("/getPreviewUserInfo", {username:this.state.username});
            //const resdata = await response.json();
            const resdata = { 
                "picture": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.watsonmartin.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fdefault-profile-picture.jpg",
                "uni": "University of Bath",
                "username":"John Smith",
                "pens": 257
            } 
            this.setState({ profile: resdata })
            this.setState({ loading: false })
        }
    }
    componentDidMount() {
        this.getProfileInfo()
    }
    render() {
        return (
            <div className="navbar">
                <Link to="/" className="navbar-logo clickable">
                    <img src={logo} alt="Pallas Logo" />
                    <div>pallas</div>
                </Link>
                <div className="navbar-search">
                    <img src={search} alt="Upload button" className="clickable"/>
                    <input  placeholder="Finite automata to regular expressions"/>
                </div>
                <div className="navbar-upload clickable" onClick={this.uploadCallback}>
                    <img src={upload} alt="Upload button"/>
                </div>
                {this.state.loggedIn ? this.state.loading || !this.state.profile ? 
                        (
                            <div className="navbar-profile">Loading...</div>
                        ) : (
                            <div className="navbar-profile">
                                <img src={this.state.profile.picture} alt="Profile" />
                                <div className="navbar-profile-content" >
                                    <div className="navbar-profile-name">{this.state.profile.username}</div>
                                    <div className="navbar-profile-uni">{this.state.profile.uni}</div>
                                    <div className="navbar-profile-pens"><span role="img" aria-label="pen">🖋️</span> {this.state.profile.pens} pens</div>
                                </div>
                            </div>

                        ) : (
                <div className="navbar-profile clickable" onClick={this.loginCallback}>Sign In</div>
                )}
            </div>
        );
    }
}

export default Navbar;
