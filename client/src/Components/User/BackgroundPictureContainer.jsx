import { useState } from "react"
// Assets
import changeIcon from "../../assets/icons/change_arrows.png";

export const BackgroundPictureContainer = ({ uuid, own_uuid, image }) => {
  const [hover, setHover] = useState(false);

  const changeBackground = async (e) => {
    e.preventDefault();
    const form = document.getElementById('change-background_form');
    const formData = new FormData(form);
    formData.append('auth', own_uuid);
    //await fetch('http://localhost:3000/user/background', {
    await fetch('https://talkbook.up.railway.app/user/background', {
      method: 'PATCH',
      headers: {
        token: localStorage.getItem('jwt'),
      },
      body: formData,
    });
    location.reload();
  }

  if (uuid === own_uuid) {
    return (
      <div className="background_container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div>
          <form id="change-background_form">
              <label htmlFor="background">
                <div className={`background-picture_overlay ${hover ? 'active' : ''}`}>
                  <img src={changeIcon} />
                </div>
              </label>
              <input type="file" name="background" id="background" style={{display: "none"}} onChange={changeBackground} />
          </form>
        </div>
        <img className="background-picture" src={image} />
      </div>
    )  
  } else {
    return (
      <div className="background_container">
        <img className="background-picture" src={image} />
      </div>
    )
  }
}