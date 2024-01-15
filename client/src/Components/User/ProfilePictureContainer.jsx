import { useState } from "react";
// Components
import { RoundPicture } from "../Images/RoundPicture";
// Assets
import changeIcon from "../../assets/icons/change_arrows.png";

export const ProfilePictureContainer = ({ uuid, own_uuid, avatar }) => {
  const [hover, setHover] = useState(false);

  const changeAvatar = async (e) => {
    e.preventDefault();
    const form = document.getElementById('change-avatar_form');
    const formData = new FormData(form);
    formData.append('auth', own_uuid);
    await fetch('http://localhost:3000/user/avatar', {
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
      <div style={{position:'relative'}} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div>
          <form id="change-avatar_form">
              <label htmlFor="avatar">
                <div className={`profile-picture_overlay ${hover ? 'active' : ''}`}>
                  <img src={changeIcon} />
                </div>
              </label>
              <input type="file" name="avatar" id="avatar" style={{display: "none"}} onChange={changeAvatar} />
          </form>
        </div>
        <RoundPicture className="profile-picture" source={avatar} radius={'168px'} alt={'Profile picture'} />
      </div>
    )  
  } else {
    return (
      <RoundPicture className={'profile-picture'} source={avatar} radius={'168px'} alt={'Profile picture'} />
    )
  }
}