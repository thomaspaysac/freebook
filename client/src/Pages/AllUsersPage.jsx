import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
// Components
import { Layout } from "../Components/Layout";
import { RoundPicture } from "../Components/Images/RoundPicture";

export const AllUsersPage = () => {
  const [users, setUsers] = useState();

  const fetchUsers = async () => {
    const req = await fetch("http://localhost:3000/user");
    const res = await req.json();
    setUsers(res);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  const UsersList = () => {
    if (!users) {
      return null;
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
      <div className="content users-list">
        <h2>All users</h2>
        <UsersList />
      </div>
    </Layout>
  )
}