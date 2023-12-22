import { useContext } from "react"
import { authContext } from "../../App"

export const AvatarUpload = () => {
  const authData = useContext(authContext);

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('auth', authData.sub);
    await fetch('http://localhost:3000/user/avatar', {
      method: 'PATCH',
      body: formData,
    })
  } 

  return (
    <form onSubmit={sendForm}>
      <label htmlFor="avatar">Avatar</label>
      <input type="file" name="avatar" id="avatar" />
      <button>Upload file</button>
    </form>
  )
  
}