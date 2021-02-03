import React from 'react';
import logo from './images/logo.svg';
import upload from './images/upload.svg';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar-logo">
                    <img src={logo} alt="Pallas Logo" />
                    <div>pallas</div>
                </div>
                <input className="navbar-search" placeholder="Search"/>
                <div className="navbar-upload">
                    <img src={upload} alt="Upload button" />
                </div>
                <div className="navbar-profile">
                </div>
            </div>
        );
    }
}

export default App;
