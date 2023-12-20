import { useState, useContext } from "react";
import { CommentsList } from "./CommentsList";
import { authContext } from "../../App";
// Components
import { RoundPicture } from "../Images/RoundPicture";

export const PostComments = ({ post_ID, author, comments }) => {
  const [expanded, setExpanded] = useState(false);
  const authData = useContext(authContext);

  const createComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('author', author);
    const data = Object.fromEntries(formData.entries());
    await fetch(`http://localhost:3000/posts/${post_ID}/comments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  if (!comments) {
    return (
      <>Loading...</>
    )
  }

  if (!expanded) {
    return (
      <div className="comments-toggle" onClick={() => setExpanded(true)}>Show comments</div>
    )
  }

  return (
    <div className="comments_container">
      <div className="comments-toggle" onClick={() => setExpanded(false)}>Hide comments</div>
      <form className="comment-form" onSubmit={createComment}>
        <label htmlFor="text" style={{display:'none'}}>Comment</label> 
        <textarea name='text' placeholder="Write a comment..." />
        <button>Send</button>
      </form>
      <CommentsList comments={comments} />
    </div>
  )
}