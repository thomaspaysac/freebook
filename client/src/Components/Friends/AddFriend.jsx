import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App";

export const AddFriend = ({ friend_ID, friendShip }) => {
  const [friendStatus, setFriendStatus] = useState();
  const [toggleDelete, setToggleDelete] = useState(false);
  const authData = useContext(authContext);

  const addFriend = async () => {
    if (friend_ID === authData.sub) {
      return;
    }
    setFriendStatus('pending');
    const data = {
      user_ID: authData.sub,
      friend_ID 
    }
    await fetch('http://localhost:3000/user/friends/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  const deleteFriend = async () => {
    if (window.confirm('Delete ?')) {
      await fetch(`http://localhost:3000/user/friends/${friend_ID}/delete`, {
        method: 'DELETE',
        headers : {
          authorization: authData.sub,
        }
      });
      setFriendStatus(null);
    } else {
      return;
    }
  }

  useEffect(() => {
    setFriendStatus(friendShip);
  }, [friendShip])

  useEffect(() => {
  }, [friend_ID])

  if (!friend_ID || friend_ID === authData.sub) {
    return null
  }

  if (friendStatus === 'pending') {
    return (
      <div className="friendship-status pending">
        Friend request pending...
      </div>
    )
  } else if (friendStatus === 'friend' && !toggleDelete) {
    return (
      <div className="friendship-status accepted"
        onClick={deleteFriend}
        onMouseEnter={() => setToggleDelete(true)}>
        ✔ Friend
      </div>
    )
  } else if (friendStatus === 'friend' && toggleDelete) {
    return (
      <div className="friendship-status delete"
        onClick={deleteFriend}
        onMouseLeave={() => setToggleDelete(false)}>
        ✘ Unfriend
      </div>
    )
  } else if (friendStatus === null) {
    return (
      <button className="add-friend-button" onClick={addFriend}><span style={{fontSize: '32px', fontWeight: 400}}>+</span> Add to your friends</button>
    )
  } else {
    return null;
  }
}