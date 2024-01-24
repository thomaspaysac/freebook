import { Link } from "react-router-dom";
import { UserContainer } from "./UserContainer";

export const Header = ({theme, switchLanguage}) => {
  return (
    <header data-theme={theme}>
      <Link to='/' className="header_logo">freebook</Link>
      <button onClick={() => switchLanguage('en')}>en</button>
      <button onClick={() => switchLanguage('fr')}>fr</button>
      <UserContainer />
    </header>
  )
}