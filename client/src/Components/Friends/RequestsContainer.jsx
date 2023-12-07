export const FriendsRequestsContainer = ({requests}) => {
  return (
    <div>
      <button onClick={() => console.log(requests)}>Log requests</button>
    </div>
  )
}