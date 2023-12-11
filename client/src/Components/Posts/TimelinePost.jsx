import { useEffect } from "react";

export const TimelinePost = ({ post }) => {
  useEffect(() => {

  }, [post])

  if (!post) {
    return null;
  }

  return (
    <>
      <div>{post.author.first_name} {post.author.last_name}</div>
      <div>{post.text}</div>
    </>
  )
}