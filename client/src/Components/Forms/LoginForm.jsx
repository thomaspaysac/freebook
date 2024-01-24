import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

export const LoginForm = ({ openSignup }) => {
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();
  const intl = useIntl();

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
    if (res.status !== 200) {
      setError(true);
      return;
    }
    localStorage.setItem('jwt', res.data.session.access_token);
    navigateTo('/feed');
    location.reload();
  }

  const guestLogin = async () => {
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
    localStorage.setItem('jwt', res.data.session.access_token);
    navigateTo('/feed');
    location.reload();
  }

  const ErrorContainer = () => {
    if (!error) {
      return null;
    }
    return (
      <div className="error-container">
        <FormattedMessage id="login-error" defaultMessage="Invalid credentials." />
      </div>
    )
  }

  return (
    <div className="login-form_container">
      <form onSubmit={login}>
        <input type="email" name="email" placeholder={intl.formatMessage({ id: "placeholder_email" })} />
        <input type="password" name="password" placeholder={intl.formatMessage({ id: "placeholder_password" })} />
        <button><FormattedMessage id="login-button" defaultMessage="Log In" /></button>
        <ErrorContainer />
      </form>
      <Link to="/login/recover"><FormattedMessage id="pw-forgot_link" defaultMessage="Forgot password?" /></Link>
      <div className="separator"></div>
      <button className="signup-button" onClick={openSignup}><FormattedMessage id="signup-button" defaultMessage="Create new account" /></button>
      <div><FormattedMessage id="login-form_or" defaultMessage="or" /></div>
      <button className="guest-login_button" onClick={guestLogin}><FormattedMessage id="login_guest" defaultMessage="Log in as guest" /></button>
    </div>
  )
}