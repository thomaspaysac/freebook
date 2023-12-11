import { useContext } from "react"
import { authContext } from "../../App"
import { Link } from "react-router-dom";

const styles = {
  a: {
    textDecoration: 'none',
    color: '#ffffff'
  }
}

export const UserContainer = () => {
  const authData = useContext(authContext);

  const logOut = async () => {
    await fetch('http://localhost:3000/user/logout');
  }

  if (!authData) {
    return null;
  }

  return (
    <nav>
      {authData.email}
      <Link to='/friends/requests' style={styles.a}>Friends requests</Link>
      <Link to='/post/new'>New Post</Link>
      <button onClick={logOut}>Log out</button>
    </nav>
  )
}