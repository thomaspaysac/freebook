import { useContext } from "react";
import { authContext } from "../../App";

export const TimelinePost = ({ post, user_ID }) => {
  const authData = useContext(authContext);

  /*const likePost = async () => {
    await fetch(`http://localhost:3000/posts/${post.id}/like`, {
      method: 'PATCH',
      headers: {
        authorization: user_ID,
      }
    })
  }*/

  const likePost = async () => {
    const body = {
      author: user_ID,
      post: post.id
    };
    await fetch(`http://localhost:3000/posts/${post.id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  if (!post || !authData) {
    return null;
  }

  return (
    <>
      <div>{post.author.first_name} {post.author.last_name}</div>
      <div>{post.text}</div>
      <div>{post.created_at}</div>
      <div onClick={likePost}>❤ {post.likes}</div>
    </>
  )
}