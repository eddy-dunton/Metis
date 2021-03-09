import React from 'react';
import './App.css';

import Note from './components/note.js';

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
        this.setState({ loggedIn: this.props.loggedIn,myusername:this.props.myusername,token:this.props.token })
        if (this.props.loggedIn){
            this.getProfileInfo(this.props.username, this.props.token)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username || prevProps.loggedIn !==this.props.loggedIn){
            this.setState({ loggedIn: this.props.loggedIn,myusername:this.props.myusername,token:this.props.token })
            if (this.props.loggedIn){
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
                                            console.log(note)
                                            return (

                                                <Note key={i} title={note.Title} unitcode={note.UnitCode} pens={note.Pens} downloads={note.Downloads} description={note.Description}/>
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
