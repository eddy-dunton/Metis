import React from 'react';

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './App.css';
import './nlicss.css';
import './previewTempCSS.css';
import defaultPP from './images/defaultProfPic2.png';

import Comment from './comment.js';


class NotePreview extends React.Component {
  render() {
    return (
      <div className="app">
        <div className = "breadcrumbs">
          <div className ="bc-item bc-label">University of Bath</div>
          <div className ="bc-item bc-dot" />
          <div className ="bc-item bc-label">CM20255</div>
          <div className ="bc-item bc-dot" />
          <div className ="bc-item bc-label">This Note</div>
        </div>
        <div className = "profile-preview">
          <img src={defaultPP} alt="Profile Picture" />
          <div className = "profile-info">
            <h1>Jerry Johnson
              <p className = "inline">·7h</p>
            </h1>
            <p>Maths and Computer Science</p>
          </div>
          <div className = "pens">
            <div><span role="img" aria-label="pen">🖋️</span> 187 pens</div>
          </div>
        </div>
        <div className = "main-preview">
          <div className="main-note-info">
            <div className="main-pdf-icon">
              <p>PDF</p>
            </div>
              <h1>Pushdown automata</h1>
          </div>
          <div className = "main-note-body">
            <p>
              We study a new and more powerful model of computation which comes with a simple form of memory. This is called the pushdown automaton (PDA), and is essentially a NFA equipped with a "stack", which allows us to "pop" and "push" words from our memory as we move through the automaton. We demonstrate the power of new kind of automaton by showing that any context-free language is accepted by a suitable PDA.
            </p>
            <div className="main-body-downloads">
              <p>23 downloads</p>
            </div>
            <button className="download-button">DOWNLOAD (3.5mb)</button>
          </div>
          <div className="main-pdf-preview">
          </div>
        </div>
        <div className = "join-strips">
          <div className="strip left" />
          <div className="strip right" />
        </div>
        <div className = "comment-preview">
          <div className = "comment-number">
            <p>3 Comments</p>
          </div>
          <input  placeholder="Leave a Comment"/>
          <Comment author="James Jameson" text = "Nice notes!" profilePicture ={defaultPP} time = "7h" />
          <Comment author ="Deez Nuts" text = "Oh something came in the mail today? Deez nuts. [pause for laughter]. GOTEEEEMMMM" profilePicture = {defaultPP} time ="5m" />
          <Comment author="Annoyingly Long Name" text = "hi uwu :3" profilePicture ={defaultPP} time = "2d" />
        </div>
      </div>
    );
  }

}

export default NotePreview
