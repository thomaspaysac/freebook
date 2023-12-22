import { useContext, useState } from "react";
import { authContext } from "../../App";
// Assets
import imageUpload from "../../assets/icons/image_upload.png";

export const NewPostForm = () => {
  const authData = useContext(authContext);

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('author', authData.sub);
    //const data = Object.fromEntries(formData.entries());
    await fetch('http://localhost:3000/posts/create', {
      method: 'POST',
      body: formData,
      /*headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)*/
    })
  }

  return (
    <div className="new-post_form">
      <form onSubmit={sendForm}>
        <div className="input-group">
          <textarea name="text"></textarea>
          <label htmlFor="file">
            <img src={imageUpload} />
          </label>
          <input type="file" name="file" id="file" style={{display: "none"}} />
        </div>
        <button>Publish post</button>
      </form>
    </div>
  )
}