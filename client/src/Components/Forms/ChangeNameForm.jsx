import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const ChangeNameForm = ({ authData }) => {
  const [successState, setSuccessState] = useState();
  const intl = useIntl();
  
  const updateName = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const req = await fetch(`http://localhost:3000/user/${authData.sub}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: authData.sub,
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    if (res.status === 200) {
      setSuccessState("success");
    } else {
      setSuccessState("error");
    }
  }

  const SuccessFeedback = () => {
    if (!successState) {
      return null;
    } else if (successState === "success") {
      return (
        <div className="success-container">
          <FormattedMessage id="settings_change-name_success" defaultMessage="Your name has been successfully changed." />
        </div>
      )
    } else {
      return (
        <div className="error-container">
          <FormattedMessage id="settings_change-name_error" defaultMessage="There was an error, please try again." />
        </div>
      )
    }
  }

  return (
    <div className="change-name-form_container">
      <h3><FormattedMessage id="settings_change-name" defaultMessage="Change your name" /></h3>
      <form onSubmit={updateName}>
        <input type="text" name="first_name" id="first_name" placeholder={intl.formatMessage({ id: "placeholder_first-name" })} minLength={2} maxLength={20} />
        <input type="text" name="last_name" id="last_name" placeholder={intl.formatMessage({ id: "placeholder_last-name" })} minLength={2} maxLength={20} />
        <button><FormattedMessage id="settings_change-name" defaultMessage="Change your name" /></button>
      </form>
      <SuccessFeedback />
    </div>
  )
}