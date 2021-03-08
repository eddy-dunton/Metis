import './previewTempCSS.css';

function Comment(props) {
  /*
    Props: author, profilePicture, text , time
    -All currently strings however time should be changed
  */
  return (
    <div className="comment-container">
      <img src={props.profilePicture} alt="Profile Picture" />
      <div className = "comment-info">
        <h1>{props.author}
          <p className = "inline">·{props.time}</p>
        </h1>
        <p>{props.text}</p>
      </div>
      <p className="comment-like-reply"><span onClick={() => {console.log('Temp Like')}}>like</span>·<span onClick={() => {console.log('REPLY')}}>reply</span></p>
    </div>
  );

}


export default Comment
