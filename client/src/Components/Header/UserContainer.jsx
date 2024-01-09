import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App"
import { Link, useNavigate } from "react-router-dom";
// Components
import { RoundPicture } from "../Images/RoundPicture";
// Assets
import homeIcon from "../../assets/icons/home.png";
import friendsIcon from "../../assets/icons/friends.png";
import friendsIconHover from "../../assets/icons/friends_hover.png";
import feedIcon from "../../assets/icons/newspaper.png";
import feedIconHover from "../../assets/icons/newspaper_hover.png";
import logoutIcon from "../../assets/icons/logout.png";
import logoutIconHover from "../../assets/icons/logout_hover.png";

export const UserContainer = () => {
  const [userData, setUserData] = useState(null);
  const [feedHover, setFeedHover] = useState(false);
  const [friendsHover, setFriendsHover] = useState(false);
  const [logoutHover, setLogoutHover] = useState(false);
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
      <Link to='/timeline'
        onMouseEnter={() => setFeedHover(true)}
        onMouseLeave={() => setFeedHover(false)}
      >
        <img src={feedHover ? feedIconHover : feedIcon} title="Feed" alt='' />
      </Link>
      <Link to='/friends/requests'
        onMouseEnter={() => setFriendsHover(true)}
        onMouseLeave={() => setFriendsHover(false)}
      >
        <img src={friendsHover ? friendsIconHover : friendsIcon} title="Friends requests" alt='' />
      </Link>
      <Link to={`/user/${userData.id}`} className="user-container_profile">
        <RoundPicture source={userData.avatar} radius={'40px'} />
      </Link>
      <div className="button_logout" 
        onClick={logOut}
        onMouseEnter={() => setLogoutHover(true)}
        onMouseLeave={() => setLogoutHover(false)}
      >
        <img src={logoutHover ? logoutIconHover : logoutIcon} title="Logout" alt='logout' />
      </div>
    </nav>
  )
}