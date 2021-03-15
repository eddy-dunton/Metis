import React from 'react';


import './App.css';
import './previewTempCSS.css';
import './searchCSS.css';

import Comment from './comment.js';
import Note from './components/note.js';
import Course from './components/courseNote.js';


class SearchPage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          loading: true,
          token:props.token,
          loggedIn:props.loggedIn,
          searchResults: null,
      };
      this.failCallback = props.failCallback;
      this.getSearchPosts = this.getSearchPosts.bind(this);
      this.getSearchPosts(this.props.username,this.props.token);
  }
  //Where the data is going to get gathered
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
    }
    this.setState({searchResults:resdata});
  }


  render() {
    return (
      <div className="app">
      <div className="sidebar">
      <h1>My Courses</h1>
      <div className = "my-courses-container">
      <Course id={2495}  unitcode ="CM20254" courseName="Data Structures" />
      <Course id={2495}  unitcode ="CM20217" courseName="Foundations Of Computation" />
      <Course id={2495}  unitcode ="CM20219" courseName="Fundamentals Of Visual Computing" />
      </div>
      <h1>Recently viewed</h1>
      <div className = "recently-viewed-container">
      <Note key={12} title="John's best notes" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} hideRight={true}/>
      <Note key={12} title="Look here x" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} hideRight={true}/>
      <Note key={12} title="Computers" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} hideRight={true}/>
      </div>
      <h1>Your posts</h1>
      <div className = "your-posts-container">
      <Note key={12} title="My notes computing" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1" hideUnder ={true} hideRight={true} />
      <Note key={12} title="computers 2" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1"  hideUnder ={true} hideRight={true} />
      <Note key={12} title="CSED BABY" id={2495} unitcode="CM20225" pens={12} downloads={14} description="Test note 1"  hideUnder ={true} hideRight={true} />
      </div>
      </div>
      <div className="results">
      <div className = "breadcrumbs">
      <div className ="bc-item bc-label">University of Bath</div>
      <div className ="bc-item bc-dot" />
      <div className ="bc-item bc-label">CM20255</div>
      <div className ="bc-item bc-dot" />
      <div className ="bc-item bc-label">"Test Note"</div>
      </div>
      <div className="post-results">
      {
        this.state.searchResults ==null ? (<p>Search Failed</p>)
        : this.state.searchResults.length == 0 ? (<p>No results</p>) : (
          this.state.searchResults.map((result,i) =>{
            return (
              <div>
              <div className ="post-result-container">
              <Note key = {i} title={result.Title} id={result.File} unitcode={result.UnitCode} pens={result.Pens} downloads={result.Downloads} description={result.Description}/>
              </div>
              </div>
            )
          })
        )
      }
      </div>
      </div>

      </div>
    );
  }

}

export default SearchPage
