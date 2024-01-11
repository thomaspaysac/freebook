import { Link } from "react-router-dom";

export const DropdownMenu = ({ open, user_ID }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="dropdown-menu">
        <Link to={`/user/${user_ID}`} className="dropdown-link">
          <div>Profile</div>
        </Link>
        <div className="dropdown-separator"></div>
        <Link className="dropdown-link">
          <div>Settings</div>
        </Link>
        <div className="dropdown-separator"></div>
        <Link className="dropdown-link">
          <div>Logout</div>
        </Link>
    </div>
  )
}