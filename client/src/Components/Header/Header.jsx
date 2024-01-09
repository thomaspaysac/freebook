import { Link } from "react-router-dom";
import { UserContainer } from "./UserContainer";

export const Header = () => {
  return (
    <header>
      <Link to='/' className="header_logo">freebook</Link>
      <UserContainer />
    </header>
  )
}