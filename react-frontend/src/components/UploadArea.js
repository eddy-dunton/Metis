import React from 'react';
import '../App.css';

class UploadArea extends React.Component {
    state = {
        drag: false
    }
    dropRef = React.createRef()  
    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("-dragin-")
        console.log(e.target)

        if (e.target === this.dropRef.current){
        this.setState({drag: true})
        }
    }
    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("-dragout-")
        console.log(e.target)
        if (e.target === this.dropRef.current){
            this.setState({drag: false})
        }
    }
    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({drag: false})
        this.props.handleDrop(e.dataTransfer.files)
    }
    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }
    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        return (
            <div ref={this.dropRef} className={this.state.drag ? "uploadArea dragging clickable" : "uploadArea clickable"}>
                <div style={{textAlign:"center",zIndex:"-1"}}>
                    Drag and drop {this.props.filetype ? this.props.filetype : "PDF"} or click to browse
                </div>
            </div>
        );
    }
}

export default UploadArea;
