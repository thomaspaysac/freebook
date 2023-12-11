export const TimelinePost = ({ post }) => {
  const likePost = async () => {
    await fetch(`http://localhost:3000/posts/${post.id}/like`, {
      method: 'PATCH'
    })
  }

  if (!post) {
    return null;
  }

  return (
    <>
      <div>{post.author.first_name} {post.author.last_name}</div>
      <div>{post.text}</div>
      <div>{post.created_at}</div>
      <div onClick={likePost}>❤</div>
    </>
  )
}