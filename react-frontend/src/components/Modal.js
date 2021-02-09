import React from 'react';

import '../App.css';

import cross from '../images/cross.svg';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "display-block" : "display-none";

    return (
        //if the modal should be shown
        <div className={showHideClassName}>
            {/* background area darken, let it close when clicking off the modal */}
            <div className="modal-darken" onClick={handleClose}>
            </div>
            <section className="modal-main">
                {children}
                {/* cross in top right to close */}
                <img src={cross} alt="Close" className="modal-close clickable hover" onClick={handleClose}/>
            </section>
        </div>
    );
};

export default Modal;
