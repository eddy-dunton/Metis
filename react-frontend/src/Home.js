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
        this.failCallback = props.failCallback;
        this.getSearchPosts = this.getSearchPosts.bind(this);
    }
    componentDidMount() {
        if (this.props.loggedIn){
            this.getSearchPosts(this.props.username, this.props.token);
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedIn !== this.props.loggedIn || prevProps.searchTerm !== this.props.searchTerm){
            if (this.props.loggedIn){
                this.getSearchPosts(this.props.username, this.props.token);
            }
        }
    }
    async getSearchPosts() {                                                                   
        let response = await fetch("/searchPosts/"+this.props.searchTerm+"&username="+this.props.username+"&token="+this.props.token);
        let resdata = await response.json();
        console.log(resdata)
        if(resdata.error){
            this.failCallback();
        } else{
            this.setState({searchResults:resdata});
        }
    }

    render() {
        return (
            <div className="home">
                <div className = "top-left">
                    <h1>My Courses</h1>
                </div>
                <div className = "top-right">
                    <h1>My Notes</h1>
                </div>
                <img src = {UniLogo} className = "uni-logo"/>
            </div>
        );
    }
}

export default Home;
