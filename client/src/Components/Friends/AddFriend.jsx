import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App";

export const AddFriend = ({ friend_ID, friendShip }) => {
  const authData = useContext(authContext);

  const addFriend = async () => {
    if (friend_ID === authData.sub) {
      return;
    }

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

  useEffect(() => {
  }, [friend_ID])

  if (!friend_ID || friend_ID === authData.sub) {
    return null
  }

  if (friendShip === 'pending') {
    return (
      <div className="friendship-status pending">
        Friend request pending...
      </div>
    )
  } else if (friendShip === 'friend') {
    return (
      <div className="friendship-status accepted">
        ✔ Friend
      </div>
    )
  } else {
    return (
      <button className="add-friend-button" onClick={addFriend}><span style={{fontSize: '32px', fontWeight: 400}}>+</span> Add to your friends</button>
    )
  }
}