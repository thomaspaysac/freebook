import { useIntl } from "react-intl";
// Assets
import deleteIcon from "../../assets/icons/delete.png";

export const DeletePostButton = ({ post_ID, post_author, user_ID }) => {
  const intl = useIntl();

  const deletePost = async () => {
    if (window.confirm(intl.formatMessage({ id: "post-delete_confirm" }))) {
      //await fetch(`http://localhost:3000/posts/${post_ID}`, {
      await fetch(`https://talkbook.up.railway.app/posts/${post_ID}`, {
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
      <img className="delete-post_button" src={deleteIcon} alt='delete post' title={intl.formatMessage({ id: "delete_button" })} onClick={deletePost} />
    )
  }

}