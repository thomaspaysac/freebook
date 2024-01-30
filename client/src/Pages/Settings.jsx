import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import { authContext } from "../App";

// Components
import { Layout } from "../Components/Layout"
import { ChangeNameForm } from "../Components/Forms/ChangeNameForm"

export const SettingsPage = ({theme, switchTheme, switchLanguage}) => {
  const authData = useContext(authContext);
  const navigateTo = useNavigate();
  const intl = useIntl();

  const deleteAccount = async () => {
    if (window.confirm(intl.formatMessage({ id: "delete-account_confirm" }))) {
      await fetch(`http://localhost:3000/user/${authData.sub}/delete`, {
        method: 'DELETE',
        headers: {
          authorization: authData.sub,
          token: localStorage.getItem('jwt'),
        }
      });
      navigateTo("/");
      location.reload();
    } else {
      return;
    }
  }

  return (
    <Layout>
      <div className="content settings-page" data-theme={theme}>
        <ChangeNameForm authData={authData} />
        <div className="change-theme_container">
          <h3><FormattedMessage id="settings_language-change" defaultMessage={"Change language"} /></h3>
          <div className="choices">
          <button onClick={() => switchLanguage('en')}>English</button>
          <button onClick={() => switchLanguage('fr')}>Français</button>
          </div>
        </div>
        <div className="change-theme_container">
          <h3><FormattedMessage id="settings_theme-change" defaultMessage="Change theme" /></h3>
          <div className="choices">
            <button onClick={() => switchTheme('light')}><FormattedMessage id="light-theme" defaultMessage="Light" /></button>
            <button onClick={() => switchTheme('dark')}><FormattedMessage id="dark-theme" defaultMessage="Dark" /></button>
            <button onClick={() => switchTheme('red')}><FormattedMessage id="red-theme" defaultMessage="Red" /></button>
          </div>
        </div>
        <div className="delete-profile_container">
          <h3><FormattedMessage id="settings_delete-account" defaultMessage="Delete your account" /></h3>
          <div className="warning-message"><span className="bolded"><FormattedMessage id="delete-account_warning1" defaultMessage="Warning:" /></span> <FormattedMessage id="delete-account_warning2" defaultMessage="this action is permanent, your data will be completely deleted." /></div>
          <button onClick={deleteAccount}><FormattedMessage id="account-delete_button" defaultMessage="Delete my account" /></button>
        </div>
      </div>
    </Layout>
  )
}