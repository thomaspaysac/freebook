import { Link } from "react-router-dom"
// Components
import { RoundPicture } from "../Images/RoundPicture"

export const FriendsRequestsContainer = ({title, type, data}) => {
  const acceptRequest = async (request) => {
    await fetch(`http://localhost:3000/user/friends/request/${request.id}`, {
      method: 'PATCH'
    })
  }

  const deleteRequest = async (request) => {
    await fetch(`http://localhost:3000/user/friends/request/${request.id}`, {
      method: 'DELETE'
    })
  }

  const List = () => {
    if (!data) {
      return null;
    }
    return (
      <ul>
        {
          data.map(el => {
            if (type === 'requests') {
              return (
                <li key={el.id} className="friend-request_single">
                  <Link to={`/user/${el.user_ID.id}`}>
                    <RoundPicture source={el.user_ID.avatar} radius={'32px'} />
                    <div>{el.user_ID.first_name} {el.user_ID.last_name}</div>
                  </Link>
                  <button className="action-button action-accept" onClick={() => acceptRequest(el)}>Accept</button>
                  <button className="action-button action-reject" onClick={() => deleteRequest(el)}>Reject</button>
                </li>
              )
            } else {
              return (
                <li key={el.id} className="friend-request_single">
                  <Link to={`/user/${el.friend_ID.id}`}>
                    <RoundPicture source={el.friend_ID.avatar} radius={'32px'} />
                    <div>{el.friend_ID.first_name} {el.friend_ID.last_name}</div>
                  </Link>
                  <button className="action-button action-reject" onClick={() => deleteRequest(el)}>Cancel</button>
                </li>
              )
            }
            }
          )
        }
      </ul>
    )
  }

  return (
    <div className="friends-requests_container">
      <h3>{title}</h3>
      <ul>
        <List />
      </ul>
    </div>
  )
}