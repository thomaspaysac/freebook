import { Link } from "react-router-dom";
import { UserContainer } from "./UserContainer";

export const Header = () => {
  const autoLogin = async () => {
    const data = {
      email: 'test@gmail.com',
      password: 'Testeur'
    }
    const req = await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    localStorage.setItem('jwt', res.session.access_token);
  }

  return (
    <header>
      <Link to='/' className="header_logo">freebook</Link>
      <button onClick={autoLogin}>Auto login</button>
      <UserContainer />
    </header>
  )
}