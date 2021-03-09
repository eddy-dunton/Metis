import React from 'react';
import '../App.css';

import dots from '../images/dots.svg';
import arrow from '../images/arrow.svg';
import pdf from '../images/pdf.svg';

class UploadArea extends React.Component {
    render() {
        return (
            <div className="profile-note">
                <div className="profile-note-content">
                    <div className="profile-note-left">
                        <img className="profile-note-pdf" alt="PDF" src={pdf}/>
                        <div className="profile-note-name">{this.props.title}</div>
                    </div>
                    <div className="profile-note-right">
                        <div className="profile-note-module">{this.props.unitcode}</div>
                        <img width="32px" alt="choice dots" src={dots}/>
                        <img width="32px" alt="open note" src={arrow}/>
                    </div>
                    <div>
                        {this.props.description}
                    </div>
                </div>
                <div className="profile-note-under">
                    <div><span role="img" aria-label="pen">🖋️</span> {this.props.pens} pens</div>
                    <div>{this.props.downloads} downloads</div>
                    {/*<div>{note.comments} comments</div>*/}
                </div>
            </div>
        );
    }
}

export default UploadArea;
