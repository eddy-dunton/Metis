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
            loggedIn:props.loggedIn,
            menuShown:false,
        };
        this.loginCallback = props.loginCallback;
        this.failCallback = props.failCallback;
        this.uploadCallback = props.uploadCallback;
        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }

    showMenu(){
        this.setState({menuShown : !this.state.menuShown})

    }

    async getProfileInfo(username, token) {
        let response = await fetch("/getUserPreview/"+username+"&token="+token);
        let resdata = await response.json();
        if (resdata.username){
            this.setState({ profile: resdata,loading: false,loggedIn:true})
        } else {
            this.failCallback()
            this.setState({ profile: null,loading: true,loggedIn:false})
        }
    }
    componentDidMount() {
        this.setState({ loggedIn: this.props.loggedIn })
        if (this.props.loggedIn){
            this.getProfileInfo(this.props.username, this.props.token)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn || prevProps.token !== this.props.token){
            this.setState({ loggedIn: this.props.loggedIn })
            if (this.props.loggedIn){
                this.getProfileInfo(this.props.username, this.props.token)
            }
        }
    }
    render() {
        return (
            <>
                <div className="navbar">
                    <Link to="/" className="navbar-logo clickable">
                        <img src={logo} alt="Metis Logo" />
                        <div>metis</div>
                    </Link>
                    <div className="navbar-search">
                        <img src={search} alt="Search button" className="clickable"/>
                        <input placeholder="Search..."/>
                    </div>
                    {this.state.loggedIn ? (
                        <div className="navbar-upload hover clickable" onClick={this.uploadCallback}>
                            <img src={upload} alt="Upload button"/>
                        </div>
                    ) : (<></>)
                    }
                    {/* if its loading the profile say its loading, if not logged in show the login button, if not loading and logged in show profile */}
                    {this.state.loggedIn ? (this.state.loading || !this.state.profile) ? 
                            (
                                <div className="navbar-profile">Loading...</div>
                            ) : (
                                <div className="navbar-profile">
                                    <div className="clickable" onClick={this.showMenu}>
                                        <img src={this.state.profile.picture} alt="Profile Pic" />
                                    </div>
                                    <div className="navbar-profile-content" >
                                        <div style={{display:"flex"}}>
                                            <div onClick={this.showMenu} className="navbar-profile-name clickable">{this.state.profile.username}</div>
                                            <div className="clickable" onClick={this.showMenu} style={{alignSelf:"center", marginLeft:"4px"}}>v</div>
                                        </div>
                                        <div className="navbar-profile-uni">{this.state.profile.inst}</div>
                                        <div className="navbar-profile-pens"><span role="img" aria-label="pen">🖋️</span> {this.state.profile.score} pens</div>
                                    </div>
                                </div>

                            ) : (
                                <div className="navbar-profile navbar-signin hover clickable" onClick={this.loginCallback}>Sign In</div>
                            )}
                </div>
                {(this.state.loggedIn && this.state.menuShown) ? (this.state.loading || !this.state.profile) ? 
                        (
                            <div className="navbar-profile">Loading...</div>
                        ) : (                
                            <div className="navbar-profile-dropdown">
                                <Link onClick={this.showMenu} to={"/profile/"+this.state.profile.username} className="hover clickable">MY PROFILE</Link> 
                                <div onClick={() => {
                                    this.failCallback();
                                    this.showMenu()
                                }} className="hover clickable">SIGN OUT</div> 
                            </div>
                        ) : (<></>)}
                }
            </>
        );
}
}

export default Navbar;
