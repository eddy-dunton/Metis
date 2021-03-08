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
            myusername:props.myusername,
            token:props.token,
            loggedIn:props.loggedIn,
            search:"",
            unitFilter:"all",
            possUnits:[]
        };
        this.failCallback = props.failCallback;
        this.getProfileInfo = this.getProfileInfo.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    async getProfileInfo(username, token) {
        let response = await fetch("/getUserInfo/"+username+"&token="+token);
        let resdata = await response.json();
        resdata.username = username;
        if (resdata.error){
            this.failCallback()
            this.setState({ profile: null,loading: false,loggedIn:false})
        } else {
            this.setState({ profile: resdata,loading: false,loggedIn:true})
        }
        if (username === this.state.myusername){
            let response = await fetch("/getPotentialUnits/"+username+"&token="+token);
            let resdata = await response.json();
            if (resdata.error){
                this.failCallback()
                this.setState({ profile: null,loading: false,loggedIn:false})
            } else {
                this.setState({possUnits:resdata})
            }
        }
    }

    handleSearch(event) {    this.setState({search: event.target.value});  }

    componentDidMount() {
        if (this.props.loggedIn){
            this.setState({ loggedIn: this.props.loggedIn,myusername:this.props.myusername,token:this.props.token })
            this.getProfileInfo(this.props.username, this.props.token)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn){
            if (this.props.loggedIn){
                this.setState({ loggedIn: this.props.loggedIn,myusername:this.props.myusername,token:this.props.token })
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
                            <div className="profile-content-uni">{this.state.profile.Name}</div>
                            <div>{this.state.profile.Biography}</div>
                            {   
                                this.state.possUnits.map((unit,i) => {return (
                                    <label>
                                        <input type="checkbox" value={unit.UnitCode} onChange={(event) => {
                                            if (event.target.checked){
                                                //join unit
                                                let user = {
                                                    username : this.state.myusername,
                                                    token: this.state.token,
                                                    unitcode: event.target.value
                                                }
                                                fetch('/joinUnit', {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'application/json;charset=utf-8'
                                                    },
                                                    body: JSON.stringify(user)
                                                });
                                            } else {
                                            }

                                        }} defaultChecked={this.state.profile.units.some(x => x.UnitCode === unit.UnitCode)}/>
                                        {unit.UnitName} ({unit.UnitCode})
                                    </label>
                                )})
                            }
                            <div className="profile-content-pens"><span role="img" aria-label="pen">🖋️</span> {this.state.profile.Score} pens</div>
                        </div>
                        <div className="profile-notes">
                            <div className="profile-notes-input">
                                <input placeholder="Search for a note..." className="profile-input-search" type="text" value={this.state.search} onChange={this.handleSearch} />
                                <select value={this.state.unitFilter} className="profile-input-module" onChange={(event) => {this.setState({unitFilter:event.target.value})}}>
                                    <option value="all">All</option>
                                    {this.state.profile.units.map((unit,i)=>{return (
                                        <option key={i} value={unit.UnitCode}>{unit.UnitCode}</option>
                                    )})}
                                </select>
                            </div>
                            <div>
                                {this.state.profile.posts.map((note, i) => {
                                    if (note.Title.includes(this.state.search)) {
                                        if (this.state.unitFilter === "all" || note.UnitCode === this.state.unitFilter ){
                                        return (
                                            <div className="profile-note" key={i}>
                                                <div className="profile-note-content">

                                                    <div className="profile-note-left">
                                                        <img className="profile-note-pdf" alt="PDF" src={pdf}/>
                                                        <div className="profile-note-name">{note.Title}</div>
                                                    </div>
                                                    <div className="profile-note-right">
                                                        <div className="profile-note-module">{note.UnitCode}</div>
                                                        <img width="32px" alt="choice dots" src={dots}/>
                                                        <img width="32px" alt="open note" src={arrow}/>
                                                    </div>
                                                </div>
                                                <div className="profile-note-under">
                                                    <div><span role="img" aria-label="pen">🖋️</span> {note.Pens} pens</div>
                                                    <div>{note.Downloads} downloads</div>
                                                    {/*<div>{note.comments} comments</div>*/}
                                                </div>
                                            </div>
                                        )}
                                    }
                                })}
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
