import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
// Assets
import logoutIcon from "../../assets/icons/logout_black.png";

export const DropdownMenu = ({ open, user_ID, logoutFunction }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="dropdown-menu">
        <Link to={`/user/${user_ID}`} className="dropdown-link">
          <div><FormattedMessage id="dropdown_profile" defaultMessage="Profile" /></div>
        </Link>
        <div className="dropdown-separator"></div>
        <Link to="/user/settings" className="dropdown-link">
          <div><FormattedMessage id="dropdown_settings" defaultMessage="Settings" /></div>
        </Link>
        <div className="dropdown-separator"></div>
        <Link className="dropdown-link" onClick={logoutFunction}>
          <div><img src={logoutIcon} /><FormattedMessage id="dropdown_logout" defaultMessage="Logout" /></div>
        </Link>
    </div>
  )
}