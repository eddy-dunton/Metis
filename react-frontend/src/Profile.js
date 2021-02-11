import React from 'react';
import './App.css';


import dots from './images/dots.svg';
import arrow from './images/arrow.svg';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            loading: true,
            loggedIn:true
        };
    }

    async getProfileInfo() {
        //const response = await fetch("/getUserInfo", {username:this.state.username});
        //const resdata = await response.json();
        const resdata = { 
            "picture": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.watsonmartin.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fdefault-profile-picture.jpg",
            "uni": "University of Bath",
            "course":"Maths and Computer Science",
            "notes":[
                {"name":"Pushdown automata", "module":"CM20255","pens":257,"downloads":432,"comments":15},
                {"name":"Pushdown automata", "module":"CM20255","pens":157,"downloads":432,"comments":15},
                {"name":"Pushdown automata", "module":"CM20255","pens":87,"downloads":432,"comments":15}
            ],
            "username":"John Smith",
            "pens": 257
        } 
        this.setState({ profile: resdata })
        this.setState({ loading: false })
    }

    componentDidMount() {
        //if (this.props.loggedIn){
        //this.setState({ loggedIn: this.props.loggedIn })
        this.getProfileInfo()
        //}
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
                                            <div className="profile-note-name">{note.name}</div>
                                            <div className="profile-note-right">
                                                <div className="profile-note-module">{note.module}</div>
                                                <img width="32px" alt="choice dots" src={dots}/>
                                                <img width="32px" style={{transform:"rotate(180deg)"}} alt="open note" src={arrow}/>
                                            </div>
                                        </div>
                                        <div className="profile-note-under">
                                            <div className="profile-note-pens"><span role="img" aria-label="pen">🖋️</span> {note.pens} pens</div>
                                            <div className="profile-note-downloads">{note.downloads} downlaods</div>
                                            <div className="profile-note-comments">{note.comments} comments</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ): (
                    "need to be signed in"
                )}
            </div>
        );
    }
}

export default Profile;
