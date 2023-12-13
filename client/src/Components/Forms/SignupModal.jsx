import { useState } from "react";

export const SignupModal = ({open, closeSignup}) => {
  return (
    <>
      <div onClick={closeSignup} className={`backdrop ${open ? 'open' : ''}`}></div>
      <div className={`signup-modal ${open ? 'open' : ''}`}>
        <div className="header">
          <div>
            <h2>Sign Up</h2>
            <div>No strings attached</div>
          </div>
          <div className='close-button' onClick={closeSignup}>🗙</div>
        </div>
        <div className="separator"></div>
        <form>
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