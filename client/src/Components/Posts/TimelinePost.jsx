import { useState, useEffect } from "react";
import { PostComments } from "./Comments";

export const TimelinePost = ({ post, user_ID }) => {
  const [liked, setLiked] = useState();
  const [likesCount, setLikesCount] = useState();
  const [comments, setComments] = useState();

  const fetchLike = async () => {
    const req = await fetch(`http://localhost:3000/posts/${post.id}/like/${user_ID}`);
    const res = await req.json();
    setLikesCount(post.likes);
    if (!res.length) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  }

  const fetchComments = async () => {
    const req = await fetch(`http://localhost:3000/posts/${post.id}/comments`);
    const res = await req.json();
    setComments(res);
  }

  const toggleLike = async () => {
    if (!liked) {
      setLiked(true);
      setLikesCount(likesCount + 1);
    } else {
      setLiked(false);
      setLikesCount(likesCount - 1);
    }
    const body = {
      author: user_ID,
    };
    const {req, error} = await fetch(`http://localhost:3000/posts/${post.id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    console.log('hello');
  }

  useEffect(() => {
    fetchLike();
    fetchComments();
  }, [])

  const HeartIcon = () => {
    if (!liked) {
      return (<span onClick={toggleLike}>♡</span>)
    } else {
      return (<span onClick={toggleLike}>❤</span>)
    }
  }

  if (!post || !user_ID || !comments) {
    return null;
  }

  return (
    <>
      <div>{post.author.first_name} {post.author.last_name}</div>
      <div>{post.text}</div>
      <div>{post.created_at}</div>
      <div><HeartIcon /> {likesCount} {comments.length} comments</div>
      <PostComments post_ID={post.id} author={user_ID} comments={comments} />
    </>
  )
}