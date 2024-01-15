import { Link } from "react-router-dom";
import { format } from "date-fns";
// Components
import { RoundPicture } from "../Images/RoundPicture";
import { DeleteCommentButton } from "./DeleteCommentButton";

export const CommentsList = ({ comments, user_ID }) => {
  if (!comments) {
    return null;
  }

  return (
    <div>
      {
        comments.map(el => {
          const timeStamp = format(new Date(el.created_at), 'd MMM' + (new Date(el.created_at).getFullYear() == new Date().getFullYear()? '' : ' yyyy'))
          return (
            <div className="comment-single" key={el.id} onClick={() => console.log(el)}>
              <DeleteCommentButton 
                post_ID={el.post}
                comment_ID={el.id}
                comment_author={el.author.uuid}
                user_ID={user_ID}
              />
              <div className="comment_author-info">
                <RoundPicture source={el.author.avatar} radius={"32px"} />
                <div>
                  <a href={`/user/${el.author.id}`}>{el.author.first_name} {el.author.last_name}</a>
                  <div>{timeStamp}</div>
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