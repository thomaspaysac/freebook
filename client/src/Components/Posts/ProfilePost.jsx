import { useState, useEffect } from "react";
import { format } from "date-fns";
// Components
import { PostComments } from "./Comments";
import { RoundPicture } from "../Images/RoundPicture";
import { DeletePostButton } from "./DeletePostButton";

export const ProfilePost = ({ post, user_ID }) => {
  const [liked, setLiked] = useState();
  const [likesCount, setLikesCount] = useState();
  const [comments, setComments] = useState();
  const [update, setUpdate] = useState(0);
  const [timeStamp, setTimeStamp] = useState();

  const updateComponent = () => {
    setUpdate(update + 1);
  }

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

  const convertTimeStamp = () => {
    const temp = format(new Date(post.created_at), 'd MMM' + (new Date(post.created_at).getFullYear() == new Date().getFullYear()? '' : ' yyyy'))
    setTimeStamp(temp);
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
  }

  useEffect(() => {
    convertTimeStamp();
    fetchLike();
    fetchComments();
  }, [update])

  const HeartIcon = () => {
    if (!liked) {
      return (<span className="heart-icon" onClick={toggleLike} style={{fontSize: '1.3rem'}}>♡</span>)
    } else {
      return (<span className="heart-icon" onClick={toggleLike}>❤</span>)
    }
  }

  const PostImageContainer = () => {
    if (!post.file) {
      return null;
    }

    return (
      <div className="post_image">
        <img src={post.file} alt="" />
      </div>
    )
  }

  if (!post || !comments) {
    return null;
  }

  return (
    <div className="profile-post" onClick={() => console.log(post)}>
      <DeletePostButton
        post_ID={post.id}
        post_author={post.author.uuid}
        user_ID={user_ID}
      />
      <div className="post-info">
        <RoundPicture source={post.author.avatar} radius={'40px'} />
        <div>
          <a href={`/user/${post.author.id}`}>{post.author.first_name} {post.author.last_name}</a>
          <div>{timeStamp}
        </div>
        </div>
      </div>
      <div className="post-content">
        <div>{post.text}</div>
        <PostImageContainer />
      </div>
      <div className="social-actions_container">
        <div className="likes-count"><HeartIcon /> {likesCount}</div>
        <div>{comments.length} comments</div>
      </div>
      <div className="separator"></div>
      <PostComments post_ID={post.id} author={user_ID} comments={comments} update={updateComponent} />
    </div>
  )
}