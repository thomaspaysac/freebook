import { supabase } from "../App";

export const LoginPage = () => {
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
    <>
      <h2>Login</h2>
      <form onSubmit={login}>
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password :</label>
        <input type="password" name="password" id="password" />
        <button>Log in</button>
      </form>
    </>
  )
}