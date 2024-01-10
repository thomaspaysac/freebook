import { useNavigate } from "react-router-dom";

export const SignupModal = ({open, closeSignup}) => {
  const navigateTo = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const req = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log(res);
    localStorage.setItem('jwt', res.session.access_token);
    navigateTo('/feed');
    location.reload();
  }

  return (
    <>
      <div onClick={closeSignup} className={`backdrop ${open ? 'open' : ''}`}></div>
      <div className={`signup-modal ${open ? 'open' : ''}`}>
        <div className="header">
          <div>
            <h2>Sign Up</h2>
            <div>No strings attached</div>
          </div>
          <div className='close-button' id='close-button' onClick={closeSignup}>🗙</div>
        </div>
        <div className="separator"></div>
        <form onSubmit={signup}>
          <div className="personal-info">
            <input type="text" name="first_name" id="first_name" placeholder="First name" autoFocus/>
            <input type="text" name="last_name" id="last_name" placeholder="Last name" />
          </div>
          <input type="email" name="email" id="email" placeholder="Email" />
          <input type="password" name="password" id="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
    </>
    
  );
}