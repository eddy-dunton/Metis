import React from 'react';
import './App.css';
import './HomeCSS.css';

import UniLogo from './images/uniLogo.png'
import Note from './components/note.js';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="home">
            <div className = "top-left">
              <h1>My Courses</h1>
              <div className ="note-container">
              <Note key={12} title="Test 1" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true}/>
              </div>
              <div className ="note-container">
              <Note key={12} title="Test 2" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} />
              </div>
              <div className ="note-container">
              <Note key={12} title="Test 3" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} />
              </div>
              <div className ="note-container">
              <Note key={12} title="Test 4" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} />
              </div>
              <div className ="note-container">
              <Note key={12} title="Test 4" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} />
              </div>

            </div>
            <div className = "top-right">
              <h1>My Notes</h1>
            </div>
            <img src = {UniLogo} className = "uni-logo"/>
            <div className = "bottom-left">
              <h1>Bottom Left</h1>
            </div>
            <div className = "bottom-right">
              <h1>Bottom Right</h1>
            </div>

            </div>
        );
    }
}

export default Home;
