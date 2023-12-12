import { useState } from "react";

export const SignupModal = ({open}) => {
  return (
    <div className={`signup-modal ${open ? 'open' : ''}`}>
      <form>
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
    </div>
  );
}