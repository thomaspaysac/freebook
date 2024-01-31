import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

export const SignupModal = ({open, closeSignup, theme}) => {
  const [errors, setErrors] = useState([]);
  const navigateTo = useNavigate();
  const intl = useIntl();

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
    if (res.status !== 200) {
      setErrors(res.errors);
      return;
    }
    localStorage.setItem('jwt', res.data.session.access_token);
    navigateTo('/feed');
    location.reload();
  }

  const ErrorContainer = () => {
    if (!errors.length) {
      return null;
    } else {
      return (
        <div className="error-container">
          <ul>
            {
              errors.map((el, i) => {
                return (
                  <li key={i}>{el.msg}</li>
                )
              })
            }
          </ul>
        </div>
      )
    }
  }

  return (
    <div data-theme={theme}>
      <div onClick={closeSignup} className={`backdrop ${open ? 'open' : ''}`}></div>
      <div className={`signup-modal ${open ? 'open' : ''}`}>
        <div className="header">
          <div>
            <h2><FormattedMessage id="signup-button" defaultMessage="Sign Up" /></h2>
            <div><FormattedMessage id="signup-modal_slogan" defaultMessage="No strings attached" /></div>
          </div>
          <div className='close-button' id='close-button' onClick={closeSignup}>🗙</div>
        </div>
        <div className="separator"></div>
        <form onSubmit={signup}>
          <div className="personal-info">
            <input type="text" name="first_name" id="first_name" placeholder={intl.formatMessage({ id: "placeholder_first-name" })} minLength={2} maxLength={20} autoFocus/>
            <input type="text" name="last_name" id="last_name" placeholder={intl.formatMessage({ id: "placeholder_last-name" })} minLength={2} maxLength={20} />
          </div>
          <input type="email" name="email" id="email" placeholder={intl.formatMessage({ id: "placeholder_email" })} />
          <input type="password" name="password" id="password" placeholder={intl.formatMessage({ id: "placeholder_password" })} minLength={5} />
          <input type="password" name="password_confirm" id="password_confirm" placeholder={intl.formatMessage({ id: "placeholder_password-confirm" })} minLength={5} />
          <ErrorContainer />
          <button><FormattedMessage id="signup-button" defaultMessage="Sign Up" /></button>
        </form>
      </div>
    </div>
    
  );
}