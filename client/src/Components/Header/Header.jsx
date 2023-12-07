import { UserContainer } from "./UserContainer";

const styles = {
  header: {
    backgroundColor: '#2C2B5B',
    color: '#ffffff',
  }   
};

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
    <header style={styles.header}>
      freebook
      <button onClick={autoLogin}>Auto login</button>
      <UserContainer />
    </header>
  )
}