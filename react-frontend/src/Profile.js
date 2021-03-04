import React from 'react';
import './App.css';

import dots from './images/dots.svg';
import arrow from './images/arrow.svg';
import pdf from './images/pdf.svg';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            profile: null,
            loggedIn:props.loggedIn,
        };
        console.log(this.props)
        this.failCallback = props.failCallback;
        this.getProfileInfo = this.getProfileInfo.bind(this);
    }
    async getProfileInfo(username, token) {
        let response = await fetch("/getUserInfo/"+username+"&token="+token);
        let resdata = await response.json();
        console.log(resdata)
        if (resdata.username){
            this.setState({ profile: resdata,loading: false,loggedIn:true})
        } else {
            this.failCallback()
            this.setState({ profile: null,loading: true,loggedIn:false})
        }
    }
    componentDidMount() {
        if (this.props.loggedIn){
            this.setState({ loggedIn: this.props.loggedIn })
            this.getProfileInfo(this.props.username, this.props.token)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn){
            if (this.props.loggedIn){
                this.setState({ loggedIn: this.props.loggedIn })
                this.getProfileInfo(this.props.username, this.props.token)
            }
        }
    }

    render() {
        return (
            <div className="profile">
                {this.state.loggedIn ? (this.state.loading || !this.state.profile) ?
                        (
                    "Loading..."
                ) : (
                    <>
                        <div className="profile-content">
                            <img className="profile-content-picture" alt="profile img" src={this.state.profile.picture}/>
                            <div className="profile-content-username">{this.state.profile.username}</div>
                            <div className="profile-content-course">{this.state.profile.course}</div>
                            <div className="profile-content-uni">{this.state.profile.uni}</div>
                            <div className="profile-content-pens"><span role="img" aria-label="pen">🖋️</span> {this.state.profile.pens} pens</div>
                        </div>
                        <div className="profile-notes">
                            <div className="profile-notes-input">
                                <input />
                                {/* TODO: create dropdown component */}
                            </div>
                            <div>
                                {this.state.profile.notes.map((note, i) => (
                                    <div className="profile-note" key={i}>
                                        <div className="profile-note-content">
                                            
                                            <div className="profile-note-left">
                                                <img className="profile-note-pdf" alt="PDF" src={pdf}/>
                                                <div className="profile-note-name">{note.name}</div>
                                            </div>
                                            <div className="profile-note-right">
                                                <div className="profile-note-module">{note.module}</div>
                                                <img width="32px" alt="choice dots" src={dots}/>
                                                <img width="32px" style={{transform:"rotate(180deg)"}} alt="open note" src={arrow}/>
                                            </div>
                                        </div>
                                        <div className="profile-note-under">
                                            <div><span role="img" aria-label="pen">🖋️</span> {note.pens} pens</div>
                                            <div>{note.downloads} downloads</div>
                                            <div>{note.comments} comments</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ): (
                    "need to be signed in to view " + this.props.username
                )}
            </div>
        );
    }
}

export default Profile;
