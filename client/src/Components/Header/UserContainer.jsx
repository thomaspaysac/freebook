import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App"
import { Link, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
// Components
import { RoundPicture } from "../Images/RoundPicture";
import { DropdownMenu } from "./DropdownMenu";
// Assets
import friendsIcon from "../../assets/icons/friends.png";
import friendsNotification from "../../assets/icons/friends_notif.png";
import friendsIconHover from "../../assets/icons/friends_hover.png";
import friendsIconHoverNotification from "../../assets/icons/friends_hover_notif.png";
import feedIcon from "../../assets/icons/newspaper.png";
import feedIconHover from "../../assets/icons/newspaper_hover.png";

export const UserContainer = () => {
  const [userData, setUserData] = useState(null);
  const [feedHover, setFeedHover] = useState(false);
  const [friendsHover, setFriendsHover] = useState(false);
  const [userHover, setUserHover] = useState(false);
  const [awaitingFriendRequest, setAwaitingFriendRequest] = useState(false);
  const authData = useContext(authContext);
  const intl = useIntl();

  const navigateTo = useNavigate();

  const fetchData = async () => {
    const req = await fetch(`http://localhost:3000/user/uuid/${authData.sub}`);
    const res = await req.json();
    if (res) {
      setUserData(res[0]);
    }
  }

  const fetchFriendsRequests = async () => {
    if (!authData) {
      return;
    }
    const req = await fetch(`http://localhost:3000/user/friends/${authData.sub}/received`);
    const res = await req.json();
    if (!res || !res.length) {
      setAwaitingFriendRequest(false);
    } else {
      setAwaitingFriendRequest(true);
    }
  }

  const logOut = async () => {
    await fetch('http://localhost:3000/user/logout');
    setUserData(null);
    localStorage.setItem('jwt', '');
    navigateTo('/');
    location.reload();
  }

  useEffect(() => {
    if (authData && !userData) {
      fetchData();
      fetchFriendsRequests();
    }
  }, [authData]);

  useEffect(() => {
    fetchFriendsRequests();
  }, [friendsHover]);

  useEffect(() => {
    // Check friends requests every 5 minutes
    const interval = setInterval(() => {
      fetchFriendsRequests();
    }, 300000);
    return () => clearInterval(interval);
  }, []);


  if (!authData || !userData) {
    return null;
  }

  const FriendsButton = () => {
    if (!awaitingFriendRequest) {
      return (
        <img src={friendsHover ? friendsIconHover : friendsIcon} title={intl.formatMessage({ id: "friends-icon_title" })} alt='' />
      )
    } else {
      return (
        <div>
          <img src={friendsHover ? friendsIconHoverNotification : friendsNotification} title={intl.formatMessage({ id: "friends-icon_title" })} alt='' />
        </div>
      )
    }
  }

  return (
    <nav>
      <Link to='/feed'
        onMouseEnter={() => setFeedHover(true)}
        onMouseLeave={() => setFeedHover(false)}
      >
        <img src={feedHover ? feedIconHover : feedIcon} title={intl.formatMessage({ id: "feed-icon_title" })} alt='' />
      </Link>
      <Link to='/friends/requests'
        onMouseEnter={() => setFriendsHover(true)}
        onMouseLeave={() => setFriendsHover(false)}
      >
        <FriendsButton />
      </Link>
      <div
        className="user-dropdown_button"
        onMouseEnter={() => setUserHover(true)}
        onMouseLeave={() => setUserHover(false)}
      >
          <RoundPicture className="nav-avatar" source={userData.avatar} radius={'40px'} />
        <DropdownMenu open={userHover} user_ID={userData.id} logoutFunction={logOut} />
      </div>
    </nav>
  )
}