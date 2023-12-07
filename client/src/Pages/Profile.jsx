import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
// Components
import { FriendsList } from "../Components/Friends/FriendsList";
import { AddFriend } from "../Components/Friends/AddFriend";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState();
  const [uuid, setUuid] = useState();
  const { id } = useParams();

  const fetchProfile = async () => {
    const req = await fetch('http://localhost:3000/user/' + id);
    const res = await req.json();
    setProfileData(res[0]);
    setUuid(res[0].uuid);
  }

  useEffect(() => {
    fetchProfile();
  }, [])

  if (!profileData) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    )
  }
  
  return (
    <>
      <h1>Profile</h1>
      <button onClick={() => console.log(profileData)}>Log data</button>
      <div>{profileData.first_name}</div>
      <div>{profileData.last_name}</div>
      <AddFriend friend_ID={uuid} />
      <img src={profileData.avatar} />
      <img src={profileData.background} />
      <h3>Friends:</h3>
      <FriendsList user_ID={uuid} />
    </>
  )
}