import { useContext, useState } from "react";
import { authContext } from "../../App";
// Assets
import imageUpload from "../../assets/icons/image_upload.png";
import imageUploadColored from "../../assets/icons/image_upload_colored.png";
import deleteIcon from "../../assets/icons/delete.png";


export const NewPostForm = () => {
  const authData = useContext(authContext);
  const [fileUploaded, setFileUploaded] = useState(false);

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('author', authData.sub);
    await fetch('http://localhost:3000/posts/create', {
      method: 'POST',
      body: formData,
    })
  }

  const checkFile = (e) => {
    if (!e.target.value) {
      setFileUploaded(false);
    } else {
      setFileUploaded(true);
    }
  }

  const cancelUpload = () => {
    const fileInput = document.getElementById("file");
    fileInput.value = null;
    setFileUploaded(false);
  }

  const CancelFileUploadButton = () => {
    if (!fileUploaded) {
      return null;
    } else {
      return (
        <div className="cancel-upload_button" onClick={cancelUpload}>
          <img src={deleteIcon} alt="cancel image upload" title="Cancel image upload" />
        </div>
      )
    }
  }

  return (
    <div className="new-post_form">
      <form onSubmit={sendForm}>
        <div className="input-group">
          <textarea name="text"></textarea>
          <div className="upload-group">
            <label htmlFor="file">
              <img src={fileUploaded ? imageUploadColored : imageUpload} alt='upload image' title="Upload image" />
            </label>
            <input type="file" name="file" id="file" style={{display: "none"}} onChange={checkFile} />
            <CancelFileUploadButton />
          </div>
        </div>
        <button>Publish post</button>
      </form>
    </div>
  )
}