import { Link } from "react-router-dom";

export const HomePage = () => {
  const getUsers = async () => {
    const req = await fetch('http://localhost:3000/user');
    const res =  await req.json();
  }

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={getUsers}>Get users database</button>
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Signup</Link>
    </>
  )
}