import { Link } from "react-router-dom";

export const CommentsList = ({ comments }) => {
  if (!comments) {
    return null;
  }

  return (
    <ul>
      {
        comments.map(el => {
          return (
            <li key={el.id} onClick={() => console.log(el)}>
              <div><Link to={`/user/${el.author.id}`}><b>{el.author.first_name} {el.author.last_name}</b></Link></div>
              <div>{el.text}</div>
              <div>{el.created_at}</div>
            </li>
          )
        })
      }
    </ul>
  )
}