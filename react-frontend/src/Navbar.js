import React from 'react';
import logo from './images/logo.svg';
import upload from './images/upload.svg';
import search from './images/search.svg';
import './App.css';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profile: null,
        };

        this.getProfileInfo = this.getProfileInfo.bind(this);
    }

    async getProfileInfo() {
        /*
        const url = "/getPreviewUserInfo";
        const reqdata = {username:username}
        const response = await fetch(url);
        const resdata = await response.json();*/
        const resdata = { 
            picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.watsonmartin.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fdefault-profile-picture.jpg",
            uni: "University of Bath",
            username:"John Smith",
            pens: 257,
        } 
        this.setState({ profile: resdata })
        this.setState({ loading: false })
    }
    componentDidMount() {
        this.getProfileInfo()
        console.log(this.state)
    }
    render() {
        return (
            <div className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Pallas Logo" />
                    <div>pallas</div>
                </div>
                <div className="navbar-search">
                    <img src={search} alt="Upload button" />
                    <input  placeholder="Finite automata to regular expressions"/>
                </div>
                <div className="navbar-upload">
                    <img src={upload} alt="Upload button" />
                </div>
                { this.state.loading || !this.state.profile ? 
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

                        )}
            </div>
        );
    }
}

export default Navbar;
