import { useState, useEffect } from "react"

export const FriendsList = ({ user_ID }) => {
  const [friends, setFriends] = useState();

  const fetchFriendsList = async () => {
    const req = await fetch(`http://localhost:3000/user/friends/${user_ID}`)
    const res = await req.json();
    setFriends(res);
  }

  useEffect(() => {
    fetchFriendsList();
  }, [user_ID])

  if (!friends) {
    return (
      <>
        Friends list loading...
      </>
    )
  } else {
    return (
      <ul>
        {
          friends.map((el) => {
            return (
              <li key={el.id}>
                {el.friend_ID.first_name}
                {el.friend_ID.last_name}
                <img src={el.friend_ID.avatar} />
              </li>
            )
          })
        }
      </ul>
    )
  }
}