import { useContext } from "react";
import { authContext } from "../App";

export const PostCreatePage = () => {
  const authData = useContext(authContext);

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch('http://localhost:3000/user/avatar', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <>
      <h1>Post creation</h1>
      <form onSubmit={sendForm}>
        <input type="file" name="avatar" />
        <button>Upload file</button>
      </form>
    </>
  )
}