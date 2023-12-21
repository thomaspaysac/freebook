import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom";
import { authContext } from "../App";
// Components
import { FriendsList } from "../Components/Friends/FriendsList";
import { AddFriend } from "../Components/Friends/AddFriend";
import { RoundPicture } from "../Components/Images/RoundPicture";
import { PostsList } from "../Components/Posts/PostsList";
import { NewPostForm } from "../Components/Forms/NewPost";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState();
  const [uuid, setUuid] = useState();
  const [showPostForm, setShowPostForm] = useState(false);
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
  
  return (
    <div className="content profile">
      <div className="user-info_container">
        <img className="background-picture" src={profileData.background} />
        <div className="user-info">
          <RoundPicture className={'profile-picture'} source={profileData.avatar} radius={'168px'} alt={'Profile picture'} />
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
          <div className="section-header">
            <h3>Posts</h3>
            <button onClick={() => setShowPostForm(!showPostForm)}>Write a new post</button>
          </div>
          <NewPostForm expanded={showPostForm} />
          <PostsList user_ID={uuid} />
        </div>
      </div>
      
    </div>
  )
}