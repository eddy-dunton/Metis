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
            token:props.token,
            loggedIn:props.loggedIn,
        };
        this.loginCallback = props.loginCallback;
        this.failCallback = props.failCallback;
        this.uploadCallback = props.uploadCallback;
        this.getProfileInfo = this.getProfileInfo.bind(this);
    }
    async getProfileInfo() {
        console.log(this.state)
        const response = await fetch("/getUserPreview/"+this.state.username+"&token="+this.state.token);
        const resdata = await response.json();
        if (resdata.username){
            this.setState({ profile: resdata,loading: false,loggedIn:true})
        } else {
            this.failCallback()
            this.setState({ profile: null,loading: true,loggedIn:false})
        }
        /*const resdata = { 
            "picture": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.watsonmartin.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fdefault-profile-picture.jpg",
            "inst": "University of Bath",
            "username":"John Smith",
            "score": 257
        } */
    }
    componentDidMount() {
        if (this.props.loggedIn){
            this.setState({ loggedIn: this.props.loggedIn })
            this.getProfileInfo()
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn){
            this.setState({ loggedIn: this.props.loggedIn })
            this.getProfileInfo()
        }
    }
    render() {
        return (
            <div className="navbar">
                <Link to="/" className="navbar-logo clickable">
                    <img src={logo} alt="Metis Logo" />
                    <div>metis</div>
                </Link>
                <div className="navbar-search">
                    <img src={search} alt="Search button" className="clickable"/>
                    <input  placeholder="Search..."/>
                </div>
                <div className="navbar-upload hover clickable" onClick={this.uploadCallback}>
                    <img src={upload} alt="Upload button"/>
                </div>
                {/* if its loading the profile say its loading, if not logged in show the login button, if not loading and logged in show profile */}
                {this.state.loggedIn ? (this.state.loading || !this.state.profile) ? 
                        (
                            <div className="navbar-profile">Loading...</div>
                        ) : (
                            <div className="navbar-profile">
                                <img src={this.state.profile.picture} alt="Profile" />
                                <div className="navbar-profile-content" >
                                    <div className="navbar-profile-name">{this.state.profile.username}</div>
                                    <div className="navbar-profile-uni">{this.state.profile.inst}</div>
                                    <div className="navbar-profile-pens"><span role="img" aria-label="pen">🖋️</span> {this.state.profile.score} pens</div>
                                </div>
                            </div>

                        ) : (
                            <div className="navbar-profile navbar-signin hover clickable" onClick={this.loginCallback}>Sign In</div>
                        )}
            </div>
        );
    }
}

export default Navbar;
