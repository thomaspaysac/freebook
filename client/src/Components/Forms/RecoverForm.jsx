import { supabase } from "../../App"

export const RecoverForm = () => {
  const sendLink = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = Object.fromEntries(formData.entries()).email;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/login/reset',
    })    
  } 

  return (
    <div className="recover-form_container">
      <h2>Enter your email to reset your password.</h2>
      <div className="separator"></div>
      <form onSubmit={sendLink}>
        <input type="email" name="email" id="email" placeholder="Email"/>
        <button>Send reset link</button>
      </form>
    </div>
  )
}