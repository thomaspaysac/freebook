import { useEffect } from "react"
import { supabase } from "../App"
import { useNavigate } from "react-router-dom"

import { Layout } from "../Components/Layout"

export const PasswordResetPage = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("What would you like your new password to be?");
        const { data, error } = await supabase.auth
          .updateUser({ password: newPassword })
 
        if (data) {
          alert("Password updated successfully!");
          navigateTo('/');
        } 
        if (error) alert("There was an error updating your password.")
      }
    })
  }, [])

  return (
    <Layout>
    </Layout>
  )
}