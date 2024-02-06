import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { SquarePicture } from "../Images/SquarePicture";
import { FormattedMessage } from "react-intl";

export const FriendsList = ({ user_ID, authData }) => {
  const [friends, setFriends] = useState();

  const fetchFriendsList = async () => {
    //const req = await fetch(`http://localhost:3000/user/friends/${user_ID}`);
    const req = await fetch(`https://talkbook.up.railway.app/user/friends/${user_ID}`);
    const res = await req.json();
    setFriends(res);
  }

  useEffect(() => {
    fetchFriendsList();
  }, [user_ID])

  if (!friends || !user_ID) {
    return null;
  } else if (!friends.length && user_ID === authData) {
    return (
      <div className="users-list_link">
        <Link to='/users'><FormattedMessage id="empty-friends-list" defaultMessage={"Find your first friend!"} /></Link>
      </div>
    )
  } else {
    return (
      <div className="friends-list">
        {
          friends.map((el) => {
            if (el.user_ID.uuid === user_ID) {
              return (
              <div key={el.friend_ID.id} className="friend">
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
              <div key={el.user_ID.id} className='friend'>
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