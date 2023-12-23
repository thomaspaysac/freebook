import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App"
import { Link, useNavigate } from "react-router-dom";
// Components
import { RoundPicture } from "../Images/RoundPicture";

export const UserContainer = () => {
  const [userData, setUserData] = useState(null);
  const authData = useContext(authContext);

  const navigateTo = useNavigate();

  const fetchData = async () => {
    const req = await fetch(`http://localhost:3000/user/uuid/${authData.sub}`);
    const res = await req.json();
    setUserData(res[0]);
  }

  const logOut = async () => {
    await fetch('http://localhost:3000/user/logout');
    setUserData(null);
    localStorage.setItem('jwt', '');
    navigateTo('/');
  }

  useEffect(() => {
    if (authData) {
      fetchData();
    }
  }, [authData]);

  if (!authData || !userData) {
    return null;
  }

  return (
    <nav>
      {authData.email}
      <button onClick={() => console.log(userData)}>Get authData</button>
      <Link to='/friends/requests'>Friends requests</Link>
      <Link to='/post/new'>New Post</Link>
      <Link to='/timeline'>Timeline</Link>
      <Link to={`/user/${userData.id}`} className="user-container_profile">
        <RoundPicture source={userData.avatar} radius={'40px'} />
        <div>{userData.first_name} {userData.last_name}</div>
      </Link>
      <a href={`/user/${userData.id}`}>My profile</a>
      <button onClick={logOut}>Log out</button>
    </nav>
  )
}