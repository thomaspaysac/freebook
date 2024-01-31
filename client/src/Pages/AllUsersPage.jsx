import { useEffect, useState } from "react"
import { Form, Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
// Components
import { Layout } from "../Components/Layout";
import { RoundPicture } from "../Components/Images/RoundPicture";
import { LoadingAnimation } from "../Components/LoadingAnimation";
import { NetworkErrorPage } from "./NetworkError";

export const AllUsersPage = ({theme}) => {
  const [users, setUsers] = useState();
  const [networkError, setNetworkError] = useState(false);

  const fetchUsers = async () => {
    try {
      //const req = await fetch("http://localhost:3000/user");
      const req = await fetch("https://talkbook.up.railway.app/user");
      const res = await req.json();
      setUsers(res);  
    } catch {
      setNetworkError(true);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  if (networkError) {
    return (
      <NetworkErrorPage theme={theme} />
    )
  }

  const UsersList = () => {
    if (!users) {
      return <LoadingAnimation theme={theme} />;
    }

    return (
      <div className="users-list_container">
        {
          users.map(el => {
            return (
              <Link to={`/user/${el.id}`} key={el.id} className="users-list_user">
                <div className="user-info">
                  <RoundPicture source={el.avatar} radius={'30px'} />
                  {el.first_name} {el.last_name}
                </div>
              </Link>
            )
          })
       }
      </div>
      
    )
  }

  return (
    <Layout>
      <div className="content users-list" data-theme={theme}>
        <h2><FormattedMessage id="all-users_title" defaultMessage={"All users"} /></h2>
        <UsersList />
      </div>
    </Layout>
  )
}