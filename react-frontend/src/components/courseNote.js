import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

import dots from '../images/dots.svg';
import arrow from '../images/arrow.svg';
import pdf from '../images/pdf.svg';

//PROPS: ID, courseName, unitcode

class courseNote extends React.Component {

    render() {
        return (
            <div className="note-preview">
                <div className="note-preview-content">
                    <div className="note-preview-header">
                        <div className="note-preview-left">

                            <div className="course-preview-unitcode">
                              <p>{this.props.unitcode}</p>
                            </div>
                            <Link to={"/note/"+this.props.id} className="course-preview-name">{this.props.courseName}</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default courseNote;
