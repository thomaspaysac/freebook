import { useState, useEffect, forwardRef } from "react";
import { FormattedMessage, useIntl } from 'react-intl';
// Components
import { CommentsList } from "./CommentsList";

export const PostComments = forwardRef(function PostComments({ post_ID, author, onComment }, ref) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState();
  const [errors, setErrors] = useState(false);
  const [update, setUpdate] = useState(0);
  const intl = useIntl();

  const updateComponent = () => {
    setUpdate(update + 1);
  }

  const fetchComments = async () => {
    //const req = await fetch(`http://localhost:3000/posts/${post_ID}/comments`);
    const req = await fetch(`https://talkbook.up.railway.app/posts/${post_ID}/comments`);
    const res = await req.json();
    setComments(res);
    setExpanded(true);
  }

  const createComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append('author', author);
    const data = Object.fromEntries(formData.entries());
    //const req = await fetch(`http://localhost:3000/posts/${post_ID}/comments/create`, {
    const req = await fetch(`https://talkbook.up.railway.app/posts/${post_ID}/comments/create`, {
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
      setLoading(false);
      return;
    } else {
      setErrors(false);
      document.getElementById('comment-text').value = '';
      setLoading(false);
      onComment();
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
      <div className="comments-toggle" onClick={fetchComments}><FormattedMessage id="load-comments" defaultMessage="Show comments" /></div>
    )
  }

  return (
    <div className="comments_container">
      <div className={`backdrop ${loading ? 'open' : ''}`}></div>
      <div className="comments-toggle" onClick={() => setExpanded(false)}><FormattedMessage id="hide-comments" defaultMessage="Hide comments" /></div>
      <form className="comment-form" onSubmit={createComment}>
        <textarea name='text' id="comment-text" placeholder={intl.formatMessage({ id: "placeholder_comment" })} minLength={1} maxLength={1500} />
        <button onClick={() => {updateComponent()}}><FormattedMessage id="send-comment" defaultMessage="Send" /></button>
      </form>
      <ErrorContainer />
      <CommentsList comments={comments} user_ID={author} />
    </div>
  )
})