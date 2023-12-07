import { useState, useEffect, useContext } from "react"
import { authContext } from "../../App";

export const AddFriend = ({ friend_ID }) => {
  const authData = useContext(authContext);

  const addFriend = async () => {
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
    //console.log({user_ID: authData.sub, friend_ID});
  }

  useEffect(() => {
  }, [friend_ID])

  if (!friend_ID) {
    return null
  }

  return (
      <button onClick={addFriend}>Add friend</button>
  )
}