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
                <li key={el.id}>
                  <div>{el.user_ID.first_name} {el.user_ID.last_name}</div>
                  <button onClick={() => acceptRequest(el)}>V</button>
                  <button onClick={() => deleteRequest(el)}>X</button>
                </li>
              )
            } else {
              return (
                <li key={el.id}>
                  <div>{el.friend_ID.first_name} {el.friend_ID.last_name}</div>
                  <button onClick={() => deleteRequest(el)}>X</button>
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
    <div>
      <h3>{title}</h3>
      <button onClick={() => console.log(data)}>Log requests</button>
      <ul>
        <List />
      </ul>
    </div>
  )
}