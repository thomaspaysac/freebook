import { Link } from "react-router-dom";
// Components
import { RoundPicture } from "../Images/RoundPicture";

export const CommentsList = ({ comments }) => {
  if (!comments) {
    return null;
  }

  return (
    <div>
      {
        comments.map(el => {
          return (
            <div className="comment-single" key={el.id} onClick={() => console.log(el)}>
              <div className="comment_author-info">
                <RoundPicture source={el.author.avatar} radius={"32px"} />
                <div>
                  <a href={`/user/${el.author.id}`}>{el.author.first_name} {el.author.last_name}</a>
                  <div>{el.created_at}</div>
                </div>
              </div>
              <div>{el.text}</div>
            </div>
          )
        })
      }
    </div>
  )
}