import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

import dots from '../images/dots.svg';
import arrow from '../images/arrow.svg';
import pdf from '../images/pdf.svg';

class UploadArea extends React.Component {
    state = {
        showDesc:false
    }
    tglDesc = () => {
        this.setState({showDesc:!this.state.showDesc})
    }
    render() {
        return (
            <div className="note-preview">
                <div className="note-preview-content">
                    <div className="note-preview-header">
                        <div className="note-preview-left">
                            <img className="note-preview-pdf" alt="PDF" src={pdf}/>
                            <Link to={"/note/"+this.props.id} className="note-preview-name">{this.props.title}</Link>
                        </div>
                        <div className="note-preview-right">
                            <div className="note-preview-module">{this.props.unitcode}</div>
                            <img width="32px" alt="choice dots" src={dots}/>
                            <img width="32px" alt="open note" className="clickable" onClick={this.tglDesc} style={ this.state.showDesc ?{transform: "rotate(180deg)"}:{}} src={arrow}/>
                        </div>
                    </div>

                    { this.state.showDesc ? (
                        <div className="note-preview-description">
                            {this.props.description}
                        </div>) : (<></>)
                    }
                </div>
                <div className="note-preview-under">
                    <div><span role="img" aria-label="pen">🖋️</span> {this.props.pens} pens</div>
                    <div>{this.props.downloads} downloads</div>
                    {/*<div>{note.comments} comments</div>*/}
                </div>
            </div>
        );
    }
}

export default UploadArea;
