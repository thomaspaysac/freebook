import { Link } from "react-router-dom";

export const LoginForm = ({ openSignup }) => {
  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
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
    <div className="login-form_container">
      <form onSubmit={login}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button>Log In</button>
      </form>
      <Link>Forgot password?</Link>
      <div className="separator"></div>
      <button className="signup-button" onClick={openSignup}>Create new account</button>
    </div>
  )
}