import { useContext } from "react";
import { authContext } from "../App";

export const PostCreatePage = () => {
  const authData = useContext(authContext);

  const sendForm = async (e) => {
    e.preventDefault();
    //const avatarFile = e.target.files[0];
    console.log(e.target.files[0]);
  }

  return (
    <>
      <h1>Post creation</h1>
      <form onSubmit={sendForm}>
        <input type="file" name="file" />
        <button>Upload file</button>
      </form>
    </>
  )
}