import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

export const ProfilePage = () => {
  const [profileData, setProfileData] = useState();
  const { id } = useParams();

  const fetchProfile = async () => {
    const req = await fetch('http://localhost:3000/user/' + id);
    const res = await req.json();
    setProfileData(res[0]);
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
      <div>{profileData.first_name}</div>
      <div>{profileData.last_name}</div>
      <img src={profileData.avatar} />
      <img src={profileData.background} />
    </>
  )
}