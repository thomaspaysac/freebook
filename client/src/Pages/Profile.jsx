import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom";
import { authContext } from "../App";
// Components
import { FriendsList } from "../Components/Friends/FriendsList";
import { AddFriend } from "../Components/Friends/AddFriend";
import { RoundPicture } from "../Components/Images/RoundPicture";
import { PostsList } from "../Components/Posts/PostsList";
import { NewPostForm } from "../Components/Forms/NewPost";
import { AvatarUpload } from "../Components/Uploads/AvatarUpload";
import { Layout } from "../Components/Layout";
// Assets
import changeIcon from "../assets/icons/change_arrows.png";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState();
  const [uuid, setUuid] = useState();
  const { id } = useParams();
  const authData = useContext(authContext);

  const fetchProfile = async () => {
    if (!authData) {
      return;
    }
    const req = await fetch('http://localhost:3000/user/' + id);
    const res = await req.json();
    setProfileData(res[0]);
    setUuid(res[0].uuid);
  }

  useEffect(() => {
    fetchProfile();
  }, [authData])

  if (!profileData) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }

  const NewPostContainer = () => {
    if (uuid === authData.sub) {
      return (
        <div className="profile_new-post">
          <h3>What's on your mind?</h3>
          <NewPostForm />
        </div>
      )
    }

    return null;
  }

  const ProfilePictureContainer = () => {
    const [hover, setHover] = useState(false);

    const changeAvatar = async (e) => {
      e.preventDefault();
      const form = document.getElementById('change-avatar_form');
      const formData = new FormData(form);
      formData.append('auth', authData.sub);
      await fetch('http://localhost:3000/user/avatar', {
        method: 'PATCH',
        body: formData,
      })
    }

    if (uuid === authData.sub) {
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
          <RoundPicture className="profile-picture_own" source={profileData.avatar} radius={'168px'} alt={'Profile picture'} />
        </div>
      )  
    } else {
      return (
        <RoundPicture className={'profile-picture'} source={profileData.avatar} radius={'168px'} alt={'Profile picture'} />
      )
    }
  }
  
  return (
    <Layout>
      <div className="content profile">
        <div className="user-info_container">
          <img className="background-picture" src={profileData.background} />
          <div className="user-info">
            <ProfilePictureContainer />
            <div className="user-info_data">
              <h3>{profileData.first_name} {profileData.last_name}</h3>
              <AddFriend friend_ID={uuid} />
            </div>
          </div>
        </div>
        <div className="social-container">
          <div className="friends_container">
            <div className="section-header"><h3>Friends</h3></div>
            <FriendsList user_ID={uuid} />
          </div>
          <div className="posts_container">          
            <NewPostContainer />
            <div className="section-header">
              <h3>Posts</h3>
            </div>
            <PostsList user_ID={uuid} />
          </div>
        </div>
      </div>
    </Layout>
  )
}