import { Link } from "react-router-dom";
import { UserContainer } from "./UserContainer";
import { FormattedMessage, useIntl } from "react-intl";

export const Header = ({theme, switchLanguage}) => {
  const intl = useIntl();

  return (
    <header data-theme={theme}>
      <Link to='/' className="header_logo">freebook</Link>
      <button onClick={() => switchLanguage('en')}>en</button>
      <button onClick={() => switchLanguage('fr')}>fr</button>
      <UserContainer />
    </header>
  )
}