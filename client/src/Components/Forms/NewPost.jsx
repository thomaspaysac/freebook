import { useContext, useState } from "react";
import { authContext } from "../../App";

export const NewPostForm = ({ expanded = false }) => {
  const authData = useContext(authContext);

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('author', authData.sub);
    const data = Object.fromEntries(formData.entries());
    await fetch('http://localhost:3000/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  if (!expanded) {
    return null;
  }

  return (
    <div className="new-post_form">
      <h3>What's on your mind?</h3>
      <form onSubmit={sendForm}>
        <textarea name="text"></textarea>
        <input type="file" name="file" />
        <button>Publish post</button>
      </form>
    </div>
  )
}