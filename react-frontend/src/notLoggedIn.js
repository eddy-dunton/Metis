import React from 'react';

import './nlicss.css';
import './App.css';

import logo from './images/logo.svg';
import SUPic1 from './images/site_preview_pic.svg';
import SUPic2 from './images/site_preview_pic1.svg';

class NotLoggedInPage extends React.Component {
    state={
        content:[{ 
            title:"Discover and Share Course Notes!",
            text:(<>Metis is the quickest and easiest way of downloading and sharing course notes. Never feel alone and unprepared again, the large metis community of students are publishing their course notes and are providing feedback on others each day. <em>This is Metis.</em></>),
            otherside:(
                <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                    <button className="clickable hover" onClick={() => {
                        this.props.setTab("signin");
                        this.props.loginModalShow();
                    }}  style={{marginBottom:"24px", fontSize:"20px",color:"rgba(128,208,255,1)",background:"rgba(128,208,255,0.2)",border:"none",fontWeight:"600"}}>SIGN IN</button>
                    <button className="clickable hover" onClick={() => {
                        this.props.setTab("create");
                        this.props.loginModalShow();
                    }} style={{marginBottom:"24px", fontSize:"20px",color:"rgba(110,126,136,1)",background:"rgba(128,208,255,1)",border:"none",fontWeight:"600"}}>CREATE ACCOUNT</button>
                </div>),
            color:"#555555"
        },{ 
            title:"All Your Courses In One Place!",
            text:"The Metis community have provided notes on a vast array of topics for all courses. After signing up you are automatically shown the relevant notes for your current course content.",
            otherside:(<img alt="list of notes screenshot" style={{width:"45%"}} src={SUPic1}/>),
            color:"#7e7474"
        },{ 
            title:"Join The Metis Community Today!",
            text:"Metis is a powerful and completely free revision tool that anyone can use. Just sign up using a valid university email address and get browsing and uploading notes!",
            otherside:(<img alt="list of notes screenshot" style={{width:"45%"}} src={SUPic2}/>),
            color:"#c4b6b6"
        }]
    }
    render() {
        return(
            <div className="notloggedin">
                {this.state.content.map((x,i)=>(
                    <div key={i} style={{"background":x.color}} className="section">
                        <div className="text"> {/* left */}
                            <div className="title">
                                <img width="100px" height="100px" alt="metis logo" src={logo} />
                                <div>{x.title}</div>
                            </div> {/* title */}
                            <div className="content">{x.text}</div> {/* content */}
                        </div>
                        {x.otherside}
                    </div>
                ))}
            </div>
        );
    }
}

export default NotLoggedInPage
