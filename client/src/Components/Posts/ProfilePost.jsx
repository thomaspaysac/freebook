import { useState, useEffect } from "react";
// Components
import { PostComments } from "./Comments";
import { RoundPicture } from "../Images/RoundPicture";

export const ProfilePost = ({ post, user_ID }) => {
  const [liked, setLiked] = useState();
  const [likesCount, setLikesCount] = useState();
  const [comments, setComments] = useState();

  const fetchLike = async () => {
    setLikesCount(post.likes);
    if (!user_ID) {
      return;
    } else {
      const req = await fetch(`http://localhost:3000/posts/${post.id}/like/${user_ID}`);
      const res = await req.json();
      if (!res.length) {
        setLiked(false);
      } else {
        setLiked(true);
      }  
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

  if (!post || !comments) {
    return null;
  }

  return (
    <div className="profile-post">
      <div className="post-info">
        <RoundPicture source={post.author.avatar} radius={'40px'} />
        <div>
          <div>{post.author.first_name} {post.author.last_name}</div>
          <div>{post.created_at}</div>
        </div>
      </div>
      <div>{post.text}</div>
      <div><HeartIcon /> {likesCount}</div>
      <div>{comments.length} comments</div>
      <PostComments post_ID={post.id} author={user_ID} comments={comments} />
    </div>
  )
}