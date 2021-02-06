import '../App.css';

import cross from '../images/cross.svg';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "display-block" : "display-none";

    return (
        <div className={showHideClassName}>
            <div className="modal-darken" onClick={handleClose}>
            </div>
            <section className="modal-main">
                {children}
                <img src={cross} alt="Close" className="modal-close clickable hover" onClick={handleClose}/>
            </section>
        </div>
    );
};

export default Modal;
