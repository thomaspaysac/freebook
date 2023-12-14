import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App"
import { Link } from "react-router-dom";

const styles = {
  a: {
    textDecoration: 'none',
    color: '#ffffff'
  }
}

export const UserContainer = () => {
  const [userData, setUserData] = useState();
  const authData = useContext(authContext);

  const fetchData = async () => {
    const req = await fetch(`http://localhost:3000/user/uuid/${authData.sub}`);
    const res = await req.json();
    setUserData(res[0]);
  }

  const logOut = async () => {
    await fetch('http://localhost:3000/user/logout');
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
      <Link to='/friends/requests' style={styles.a}>Friends requests</Link>
      <Link to='/post/new'>New Post</Link>
      <Link to='/timeline'>Timeline</Link>
      <Link to={`/user/${userData.id}`}>My profile</Link>
      <button onClick={logOut}>Log out</button>
    </nav>
  )
}