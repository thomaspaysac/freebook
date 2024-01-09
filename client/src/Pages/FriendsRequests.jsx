import { useContext, useEffect, useState } from "react"
import { authContext } from "../App"
import { FriendsRequestsContainer } from "../Components/Friends/RequestsContainer";
import { Layout } from "../Components/Layout";

export const FriendsRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const authData = useContext(authContext);

  const fetchRequests = async () => {
    if (!authData) {
      return;
    }
    const req = await fetch(`http://localhost:3000/user/friends/${authData.sub}/pending`);
    const res = await req.json();
    sortRequests(res);
    //setRequests(res);
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
      <div className="content requests">
        <FriendsRequestsContainer title={'Friends requests'} type={'requests'} data={requests} />
        <FriendsRequestsContainer title={'Pending invites'} type={'invites'} data={invites} />
      </div>
    </Layout>
  )
}