import { useState } from "react"
import { supabase } from "../App"
import { useNavigate } from "react-router-dom"

import { Layout } from "../Components/Layout"

export const PasswordResetPage = () => {
  const [error, setError] = useState(false);
  const navigateTo = useNavigate();

  const changePassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.password !== data.password_confirm) {
      setError(true);
      return;
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        //const newPassword = prompt("What would you like your new password to be?");
        const { data: resetData, error } = await supabase.auth
          .updateUser({ password: data.password })
 
        if (resetData) {
          navigateTo('/');
        } else if (error) {
          console.log(error);
        }
      }
    })
  }

  const ErrorMessage = () => {
    if (!error) {
      return null;
    }

    return (
      <div className="error-container">
        Error: passwords don't match.
      </div>
    )
  }

  return (
    <Layout>
      <div className="content recover">
        <div className="recover-form_container">
          <h2>Enter a new password.</h2>
          <div className="separator"></div>
          <form onSubmit={changePassword}>
            <input type="password" name="password" id="password" placeholder="Password"/>
            <input type="password" name="password_confirm" id="password_confirm" placeholder="Confirm password"/>
            <ErrorMessage />
            <button>Change password</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}