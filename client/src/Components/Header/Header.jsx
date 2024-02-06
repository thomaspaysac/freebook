import { Link } from "react-router-dom";
import { UserContainer } from "./UserContainer";

export const Header = ({theme}) => {
  return (
    <header data-theme={theme}>
      <Link to='/' className="header_logo">talkbook</Link>
      <UserContainer />
    </header>
  )
}