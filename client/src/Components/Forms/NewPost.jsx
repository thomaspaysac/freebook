import { useContext, useState } from "react";
import { authContext } from "../../App";
import { FormattedMessage } from 'react-intl';
// Assets
import imageUpload from "../../assets/icons/image-upload.png";
import imageUploadWhite from "../../assets/icons/image-upload_white.png";
import imageUploadColored from "../../assets/icons/image-upload_colored.png";
import deleteIcon from "../../assets/icons/delete.png";


export const NewPostForm = ({ update, theme }) => {
  const [loading, setLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [errors, setErrors] = useState(false);
  const authData = useContext(authContext);

  const uploadIcon = theme === 'dark' ? imageUploadWhite : imageUpload;

  const sendForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    formData.append('author', authData.sub);
    const req = await fetch('http://localhost:3000/posts/create', {
      method: 'POST',
      headers: {
        token: localStorage.getItem('jwt'),
      },
      body: formData,
    });
    const res = await req.json();
    if (res.status !== 200) {
      setErrors(res.errors);
      setLoading(false);
      return;
    } else {
      setErrors(false);
      document.getElementById('text').value = '';
      document.getElementById('file').value = '';
      setFileUploaded(false);
      setLoading(false);
    }
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

  const ErrorContainer = () => {
    if (!errors) {
      return null;
    } else {
      return (
        <div className="error-container">
          <ul>
            {
              errors.map((el, i) => {
                return (
                  <li key={i}>{el.msg}</li>
                )
              })
            }
          </ul>
        </div>
      )
    }
  }

  return (
    <div className="new-post_form">
      <div className={`backdrop ${loading ? 'open' : ''}`}></div>
      <form onSubmit={sendForm}>
        <div className="input-group">
          <textarea name="text" id="text" minLength={1} maxLength={4000}></textarea>
          <div className="upload-group">
            <label htmlFor="file">
              <img src={fileUploaded ? imageUploadColored : uploadIcon} alt='upload image' title="Upload image" />
            </label>
            <input type="file" name="file" id="file" accept="image/*" style={{display: "none"}} onChange={checkFile} />
            <CancelFileUploadButton />
          </div>
        </div>
        <ErrorContainer />
        <button onClick={update}><FormattedMessage id="new-post_submit" defaultMessage="Publish post" /></button>
      </form>
    </div>
  )
}