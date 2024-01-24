import { supabase } from "../../App";
import { FormattedMessage, useIntl } from "react-intl";

export const RecoverForm = () => {
  const intl = useIntl();

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
      <h2><FormattedMessage id="recover_message" defaultMessage="Enter your email to reset your password" /></h2>
      <div className="separator"></div>
      <form onSubmit={sendLink}>
        <input type="email" name="email" id="email" placeholder={intl.formatMessage({ id: "placeholder_email" })}/>
        <button><FormattedMessage id="recover_link" defaultMessage="Send reset link" /></button>
      </form>
    </div>
  )
}