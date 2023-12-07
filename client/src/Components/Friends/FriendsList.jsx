import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

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

  if (!friends || !user_ID) {
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
            if (el.user_ID.uuid === user_ID) {
              return (
              <li key={el.id} onClick={() => console.log(el.friend_ID)}>
                <Link to={`/user/${el.friend_ID.id}`}>
                  {el.friend_ID.first_name}
                  {el.friend_ID.last_name}
                  <img src={el.friend_ID.avatar} />
                </Link>
              </li>
              )
            } else {
              return (
              <li key={el.id} onClick={() => console.log(el.user_ID)}>
                <Link to={`/user/${el.user_ID.id}`}>
                  {el.user_ID.first_name}
                  {el.user_ID.last_name}
                  <img src={el.user_ID.avatar} />
                </Link>
              </li>
              )
            }
            
          })
        }
      </ul>
    )
  }
}