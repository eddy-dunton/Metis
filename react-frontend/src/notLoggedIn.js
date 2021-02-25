import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './css/App.css';
import './css/nlicss.css';
import logo from './images/logo.svg';
import SUPic1 from './images/signUpPic1.png';
import SUPic2 from './images/signUpPic2.png';

import Navbar from './Navbar.js';
import Home from './Home.js';
import Reset from './reset-password.js';
import Modal from './components/Modal.js';
import UploadArea from './components/UploadArea.js';


class NotLoggedInPage extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
        currentTab:'signin'
    };

    this.loginCallback = props.loginCallback;
    this.currentTab = props.currentTab;
    this.signInTabs = props.signInTabs;
    this.setCurrentTab = this.setCurrentTab.bind(this);
    console.log(this.signInTabs);
  }

  setCurrentTab(cur) {
      this.setState({ currentTab:cur });
  }

  render() {
    return(
      <div className = "app">
        <div className = "navbar">
        <Link to="/" className="navbar-logo clickable">
            <img src={logo} alt="Metis Logo" />
            <div>metis</div>
        </Link>

        </div>

        <div className = "display-block top-panel">
          <div className = "text-panel">
            <img src={logo} alt="Metis Logo" />
            <h1 className="header-text inline" >Discover and Share Course Notes!</h1>
            <p className="content-text">Metis is the quickest and easiest way of downloading and sharing course notes.
            Never feel alone and unprepared again, the large metis community of students are publishing their course notes
            and are providing feedback on others each day. <em>This is Metis.</em></p>
          </div>
          <div className = "signin-panel">
          <div className="tabs no-margin">
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
          </div>
        </div>

        <div className = "display-block mid-panel">
        <div className = "image-panel">
          <img src={SUPic1} className="fit-div"  alt="IMAGE SOON COME" />

        </div>
        <div className = "text-panel">
        <img src={logo} alt="Metis Logo" />
        <h1 className="header-text" >All Your Courses In One Place!</h1>
        <p className="content-text">The Metis community have provided notes on a vast array of topics for all courses.
        After signing up you are automatically shown the relevant notes for your current course content.</p>
        </div>
        </div>

        <div className = "display-block bot-panel">
        <div className = "text-panel">
          <img src={logo} alt="Metis Logo" />
          <h1 className="header-text">Join The Metis Community Today!</h1>
          <p className="content-text">Metis is a powerful and completely free revision tool that anyone can use. Just sign up using
          a valid university email address and get browsing and uploading notes!</p>
        </div>
        <div className = "image-panel">
          <img src={SUPic2} className="fit-div" alt="another image xx" />
        </div>
        </div>
      </div>
   );

  }
}

export default NotLoggedInPage