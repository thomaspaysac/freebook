import { useContext, useEffect, useState } from "react"
import { authContext } from "../App"
import { FriendsRequestsContainer } from "../Components/Friends/RequestsContainer";
import { Layout } from "../Components/Layout";
import { Link } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
// Components
import { LoadingAnimation } from "../Components/LoadingAnimation";
import { NetworkErrorPage } from "./NetworkError";

export const FriendsRequestPage = ({theme}) => {
  const [requests, setRequests] = useState([]);
  const [invites, setInvites] = useState([]);
  const [networkError, setNetworkError] = useState(false);
  const authData = useContext(authContext);
  const intl = useIntl();

  const fetchRequests = async () => {
    try {
      //const req = await fetch(`http://localhost:3000/user/friends/${authData.sub}/pending`);
      const req = await fetch(`https://talkbook.up.railway.app/user/friends/${authData.sub}/pending`);
      const res = await req.json();
      sortRequests(res);  
    } catch {
      setNetworkError(true);
    }
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
      <Layout>
        <div className="content requests" data-theme={theme}>
          <LoadingAnimation theme={theme} />
        </div> 
      </Layout>
    )
  }

  if (networkError) {
    return (
      <NetworkErrorPage theme={theme} />
    )
  }

  return (
    <Layout>
      <div className="content requests" data-theme={theme}>
        <div className="users-list_link">
          <Link to='/users'>+ <FormattedMessage id="all-friends_button" defaultMessage={"Find new friends"} /></Link>
        </div>
        <FriendsRequestsContainer title={intl.formatMessage({ id: "friends-requests" })} type={'requests'} data={requests} />
        <FriendsRequestsContainer title={intl.formatMessage({ id: "friends-invites" })} type={'invites'} data={invites} />
      </div>
    </Layout>
  )
}