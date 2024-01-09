// Assets
import deleteIcon from "../../assets/icons/delete.png";

export const DeletePostButton = ({ post_ID, post_author, user_ID }) => {
  const deletePost = async () => {
    if (window.confirm("Do you really want to delete this post?")) {
      await fetch(`http://localhost:3000/posts/${post_ID}`, {
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

  if (post_author !== user_ID) {
    return null;
  } else {
    return (
      <img className="delete-post_icon" src={deleteIcon} alt='delete post' title="Delete" onClick={deletePost} />
    )
  }

}