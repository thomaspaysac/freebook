import { CommentsList } from "./CommentsList";

export const PostComments = ({ post_ID, author, comments }) => {
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

  return (
    <div>
      <div onClick={() => console.log(comments)}>New comment:</div>
      <form onSubmit={createComment}>
        <textarea name='text' />
        <button>Submit comment</button>
      </form>
      <CommentsList comments={comments} />
    </div>
  )
}