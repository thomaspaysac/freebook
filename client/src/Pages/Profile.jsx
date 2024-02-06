import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom";
import { authContext } from "../App";
import { FormattedMessage } from 'react-intl';
// Components
import { FriendsList } from "../Components/Friends/FriendsList";
import { AddFriend } from "../Components/Friends/AddFriend";
import { PostsList } from "../Components/Posts/PostsList";
import { NewPostForm } from "../Components/Forms/NewPost";
import { ProfilePictureContainer } from "../Components/User/ProfilePictureContainer";
import { BackgroundPictureContainer } from "../Components/User/BackgroundPictureContainer";
import { Layout } from "../Components/Layout";
import { LoadingAnimation } from "../Components/LoadingAnimation";
import { NetworkErrorPage } from "./NetworkError";

export const ProfilePage = ({theme}) => {
  const [profileData, setProfileData] = useState();
  const [uuid, setUuid] = useState();
  const [friendShip, setFriendShip] = useState(); 
  const [update, setUpdate] = useState(0);
  const [networkError, setNetworkError] = useState(false);
  const { id } = useParams();
  const authData = useContext(authContext);

  const updateComponent = () => {
    setUpdate((prevCounter) => prevCounter + 1);
  }

  const fetchProfile = async () => {
    if (!authData) {
      return;
    }
    try {
      //const req = await fetch('http://localhost:3000/user/' + id);
      const req = await fetch('https://talkbook.up.railway.app/user/' + id);
      const res = await req.json();
      setProfileData(res[0]);
      setUuid(res[0].uuid);  
    } catch {
      setNetworkError(true);
    }
  }

  const fetchFriendStatus = async () => {
    if (!authData || !uuid) {
      return;
    }
    //const req = await fetch('http://localhost:3000/user/friends/check/' + uuid, {
    const req = await fetch('https://talkbook.up.railway.app/user/friends/check/' + uuid, {
      headers : {
        authorization: authData.sub,
      }
    });
    const res = await req.json();
    if (!res.length) {
      setFriendShip(null);
    } else if (res[0].accepted === true) {
      setFriendShip('friend');
    } else if (res[0].accepted === false) {
      setFriendShip('pending');
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [authData, id, update])

  useEffect(() => {
    fetchFriendStatus();
  }, [authData, uuid])

  if (networkError) {
    return <NetworkErrorPage theme={theme} />
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="content profile" data-theme={theme}>
          <LoadingAnimation theme={theme} />
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className="content profile" data-theme={theme}>
        <div className="user-info_container">
          <BackgroundPictureContainer 
            uuid={uuid}
            own_uuid={authData.sub}
            image={profileData.background} />
          <div className="user-info">
            <ProfilePictureContainer
              uuid={uuid}
              own_uuid={authData.sub}
              avatar={profileData.avatar} />
            <div className="user-info_data">
              <h3>{profileData.first_name} {profileData.last_name}</h3>
              <AddFriend friend_ID={uuid} friendShip={friendShip} />
            </div>
          </div>
        </div>
        <div className="social-container">
          <div className="friends_container">
            <div className="section-header"><h3><FormattedMessage id="profile_friends" defaultMessage="Friends" /></h3></div>
            <FriendsList user_ID={uuid} authData={authData.sub} />
          </div>
          <div className="posts_container">          
          <div className="profile_new-post" style={{display: uuid !== authData.sub ? "none" : "block"}}>
            <h3><FormattedMessage id="new-post_title" defaultMessage="What's on your mind?" /></h3>
            <NewPostForm update={updateComponent} theme={theme} />
          </div>
            <div className="section-header">
              <h3><FormattedMessage id="profile_posts" defaultMessage="Posts" /></h3>
            </div>
            <PostsList user_ID={uuid} update={update} />
          </div>
        </div>
      </div>
    </Layout>
  )
}