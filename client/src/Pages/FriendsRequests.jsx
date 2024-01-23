import { useContext, useEffect, useState } from "react"
import { authContext } from "../App"
import { FriendsRequestsContainer } from "../Components/Friends/RequestsContainer";
import { Layout } from "../Components/Layout";
import { Link } from "react-router-dom";

export const FriendsRequestPage = ({theme}) => {
  const [requests, setRequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const authData = useContext(authContext);

  const fetchRequests = async () => {
    const req = await fetch(`http://localhost:3000/user/friends/${authData.sub}/pending`);
    const res = await req.json();
    sortRequests(res);
  }

  const sortRequests = (requests) => {
    const tempInvites = [];
    const tempRequests = [];
    requests.forEach(req => {
      if (req.user_ID.uuid === authData.sub) {
        tempInvites.push(req);
      } else {
        tempRequests.push(req);
      }
    })
    setInvites([...tempInvites]);
    setRequests([...tempRequests]);
  }

  useEffect(() => {
    if (!authData) {
      return;
    }
    fetchRequests();
  }, [authData])

  if (!authData) {
    return (
      <>
        Loading...
      </>
    )
  }

  return (
    <Layout>
      <div className="content requests" data-theme={theme}>
        <div className="users-list_link">
          <Link to='/users'>+ Find new friends</Link>
        </div>
        <FriendsRequestsContainer title={'Friends requests'} type={'requests'} data={requests} />
        <FriendsRequestsContainer title={'Pending invites'} type={'invites'} data={invites} />
      </div>
    </Layout>
  )
}