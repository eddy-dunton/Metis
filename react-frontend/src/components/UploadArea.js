import React from 'react';
import '../App.css';

class UploadArea extends React.Component {
    state = {
        drag: false
    }
    dropRef = React.createRef()  

    handleDrag = (e) => {
        //disable the default when something is being dragged
        e.preventDefault()
        e.stopPropagation()
    }
    handleDragIn = (e) => {
        //if dragging a file ontop of the area set that there is a drag on to true
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: true})
    }
    handleDragOut = (e) => {
        //if dragging a file out of the area set that there is a drag happening to false
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
    }
    handleDrop = (e) => {
        //when something is dropped in give the file data to the handler
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        this.props.handleDrop(e.dataTransfer.files)
    }

    handleClick = (e) => {
        //when it is click opent he file browser and give the files to the handler 
        document.getElementById("browse").click()
        this.setState({drag: false})
        this.props.handleDrop(e.target.files)
    }
    componentDidMount() {
        //set up listeners
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        //remove the listeners (GC)
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        return (
            <div ref={this.dropRef} onClick={this.handleClick} className={`uploadArea clickable ${this.state.drag ? "dragging" : ""}`}>
                <input onChange={this.handleClick} type="file" id="browse" name="fileupload" style={{display: "none"}}  multiple/>
                <div className="uploadAreaText">
                    Drag and drop {this.props.filetype ? this.props.filetype : "PDF"} or click to browse
                </div>
            </div>
        );
    }
}

export default UploadArea;
