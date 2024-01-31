export const SignupPage = () => {
  const signup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    //const req = await fetch('http://localhost:3000/user/signup', {
    const req = await fetch('https://freebook.up.railway.app/user/signup', {
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
      <h2>Signup</h2>
      <form onSubmit={signup}>
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password :</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="first_name">First name :</label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Last name :</label>
        <input type="text" name="last_name" id="last_name" />
        <button>Sign up</button>
      </form>
    </>
  )
}