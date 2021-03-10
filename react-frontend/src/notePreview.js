import React from 'react';

//https://blog.logrocket.com/react-router-dom-set-up-essential-components-parameterized-routes-505dc93642f1/

import './App.css';
import './previewTempCSS.css';
import defaultPP from './images/defaultProfPic2.png';

import Comment from './comment.js';


class NotePreview extends React.Component {
    state = {
        note:null,
        loading:true,
    }
    async getNoteInfo(path, token) {
            this.setState({ loading:true })
        let response = await fetch("/getPost/"+path+"&token="+token);
        let resdata = await response.json();
        console.log(resdata)
        if (resdata.error){
            this.props.failCallback()
            this.setState({ note:null,loading:false })
        } else {
            this.setState({ note:resdata,loading:false  })
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.token){
            this.getNoteInfo(this.props.path, this.props.token)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.token !== this.props.token || prevProps.path !== this.props.path){
            this.getNoteInfo(this.props.path, this.props.token)
        }
    }
    render() {
        if (this.props.token && this.state.note){
            return (
                <div className="app">
                    <div className = "breadcrumbs">
                        <div className ="bc-item bc-label">{this.state.note.UnitCode} ({this.state.note.UnitName})</div>
                        <div className ="bc-item bc-dot" />
                        <div className ="bc-item bc-label">This Note</div>
                    </div>
                    <div className = "profile-preview">
                        <img src={defaultPP} alt="Profile Picture" />
                        <div className = "profile-info">
                            <h1>Jerry Johnson
                                <p className = "inline">·7h</p>
                            </h1>
                            <p>{this.state.note.UnitName}</p>
                        </div>
                        <div className = "pens">
                            <div><span role="img" aria-label="pen">🖋️</span> {this.state.note.Pens} pens</div>
                        </div>
                    </div>
                    <div className = "main-preview">
                        <div className="main-note-info">
                            <div className="main-pdf-icon">
                                <p>PDF</p>
                            </div>
                            <h1>{this.state.note.Title}</h1>
                        </div>
                        <div className = "main-note-body">
                            <p>
                                {this.state.note.Description}
                            </p>
                            <div className="main-body-downloads">
                                <p>{this.state.note.Downloads} downloads</p>
                            </div>
                            <button onClick={() => {window.open('/documents/'+this.props.path)}} className="download-button">DOWNLOAD</button>
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
            )

        } else {
            if (this.state.loading){
                return (<div>loading...</div>)
            } else{
                return (<div>need to be signed in</div>)
            }
        }

    }

}

export default NotePreview
