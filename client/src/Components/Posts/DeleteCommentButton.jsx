// Assets
import deleteIcon from "../../assets/icons/delete.png";

export const DeleteCommentButton = ({ post_ID, comment_ID, comment_author, user_ID }) => {
  const deleteComment = async () => {
    if (window.confirm("Do you really want to delete this comment?")) {
      await fetch(`http://localhost:3000/posts/${post_ID}/comments/${comment_ID}`, {
        method: 'DELETE',
        headers: {
          authorization: user_ID,
        }
      });
      location.reload();
    } else {
      return;
    }
  }

  if (comment_author !== user_ID) {
    return null;
  } else {
    return (
      <img className="delete-comment_button" src={deleteIcon} alt='delete comment' title="Delete" onClick={deleteComment} />
    )
  }
}