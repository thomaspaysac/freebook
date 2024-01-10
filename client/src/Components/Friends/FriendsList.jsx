import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { SquarePicture } from "../Images/SquarePicture";

export const FriendsList = ({ user_ID }) => {
  const [friends, setFriends] = useState();

  const fetchFriendsList = async () => {
    const req = await fetch(`http://localhost:3000/user/friends/${user_ID}`)
    const res = await req.json();
    setFriends(res);
    console.log(res);
  }

  useEffect(() => {
    fetchFriendsList();
  }, [user_ID])

  if (!friends || !user_ID) {
    return null;
  } else if (!friends.length) {
    return (
      <div className="users-list_link">
        <Link to='/users'>Find your first friend!</Link>
      </div>
    )
  } else {
    return (
      <div className="friends-list">
        {
          friends.map((el) => {
            if (el.user_ID.uuid === user_ID) {
              return (
              <div key={el.id}  className="friend">
                <Link to={`/user/${el.friend_ID.id}`}>
                  <SquarePicture 
                    source={el.friend_ID.avatar}
                    size={'100%'}
                    borderRadius={'6px'} />
                  <div className="name">{el.friend_ID.first_name} {el.friend_ID.last_name}</div>
                </Link>
              </div>
              )
            } else {
              return (
              <div key={el.id} className='friend'>
                <Link to={`/user/${el.user_ID.id}`}>
                  <SquarePicture 
                    source={el.user_ID.avatar}
                    size={'100%'}
                    borderRadius={'6px'} />
                  <div className="name">{el.user_ID.first_name} {el.user_ID.last_name}</div>
                </Link>
              </div>
              )
            }
            
          })
        }
      </div>
    )
  }
}