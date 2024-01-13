import { Link } from "react-router-dom";
// Assets
import logoutIcon from "../../assets/icons/logout_black.png";

export const DropdownMenu = ({ open, user_ID, logoutFunction }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="dropdown-menu">
        <Link to={`/user/${user_ID}`} className="dropdown-link">
          <div>Profile</div>
        </Link>
        <div className="dropdown-separator"></div>
        <Link to="/user/settings" className="dropdown-link">
          <div>Settings</div>
        </Link>
        <div className="dropdown-separator"></div>
        <Link className="dropdown-link" onClick={logoutFunction}>
          <div><img src={logoutIcon} />Logout</div>
        </Link>
    </div>
  )
}