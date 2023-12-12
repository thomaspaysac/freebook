export const CommentsList = ({ comments }) => {
  if (!comments) {
    return null;
  }

  return (
    <ul>
      {
        comments.map(el => {
          return (
            <li key={el.id}>
              {el.text}
            </li>
          )
        })
      }
    </ul>
  )
}