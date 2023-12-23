import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App"
import { Link, useNavigate } from "react-router-dom";
// Components
import { RoundPicture } from "../Images/RoundPicture";
// Assets
import homeIcon from "../../assets/icons/home.png";
import friendsIcon from "../../assets/icons/friends.png";

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
      <button onClick={logOut}>Log out</button>
      <Link to='/timeline'>
        <img src={homeIcon} alt='' />
      </Link>
      <Link to='/friends/requests'>
        <img src={friendsIcon} alt='' />
      </Link>
      <Link to={`/user/${userData.id}`} className="user-container_profile">
        <RoundPicture source={userData.avatar} radius={'40px'} />
      </Link>
    </nav>
  )
}