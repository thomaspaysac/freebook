import { useContext, useEffect, useState } from "react"
import { authContext } from "../App"

export const FriendsRequestPage = () => {
  const [requests, setRequests] = useState();
  const authData = useContext(authContext);

  const fetchRequests = async () => {
    if (!authData) {
      return;
    }
    const req = await fetch(`http://localhost:3000/user/friends/${authData.sub}/pending`);
    const res = await req.json();
    setRequests(res);
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
    <>
      <div>{authData.sub}</div>
      <button onClick={() => console.log(requests)}>Get data</button>
    </>
  )
}