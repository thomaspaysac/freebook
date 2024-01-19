import { useState, useContext, useEffect } from "react";
import { CommentsList } from "./CommentsList";
import { authContext } from "../../App";

export const PostComments = ({ post_ID, author, onComment }) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState();
  const [errors, setErrors] = useState(false);
  const [update, setUpdate] = useState(0);
  const authData = useContext(authContext);

  const updateComponent = () => {
    setUpdate(update + 1);
  }

  const fetchComments = async () => {
    const req = await fetch(`http://localhost:3000/posts/${post_ID}/comments`);
    const res = await req.json();
    setComments(res);
    setExpanded(true);
  }

  const createComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('author', author);
    const data = Object.fromEntries(formData.entries());
    const req = await fetch(`http://localhost:3000/posts/${post_ID}/comments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('jwt'),
      },
      body: JSON.stringify(data)
    });
    const res = await req.json();
    if (res.status !== 200) {
      setErrors(res.errors);
      return;
    } else {
      setErrors(false);
      document.getElementById('comment-text').value = '';
    }
  }

  useEffect(() => {
    if (expanded) {
      fetchComments();
    }
  }, [update]);

  const ErrorContainer = () => {
    if (!errors) {
      return null;
    }
    return (
      <div className="error-container">
        {errors[0].msg}
      </div>
    )
  }

  if (!expanded) {
    return (
      <div className="comments-toggle" onClick={fetchComments}>Show comments</div>
    )
  }

  return (
    <div className="comments_container">
      <div className="comments-toggle" onClick={() => setExpanded(false)}>Hide comments</div>
      <form className="comment-form" onSubmit={createComment}>
        <textarea name='text' id="comment-text" placeholder="Write a comment..." minLength={1} maxLength={1500} />
        <button onClick={() => {updateComponent(); onComment()}}>Send</button>
      </form>
      <ErrorContainer />
      <CommentsList comments={comments} user_ID={author} />
    </div>
  )
}