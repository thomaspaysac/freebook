import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { authContext } from "../App"
// Components
import { Layout } from "../Components/Layout"
import { ChangeNameForm } from "../Components/Forms/ChangeNameForm"

export const SettingsPage = ({theme}) => {
  const authData = useContext(authContext);
  const navigateTo = useNavigate();

  const deleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
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
        <div className="delete-profile_container">
          <h3>Delete your account</h3>
          <div className="warning-message"><span className="bolded">Warning:</span> this action is permanent, your data will be completely deleted.</div>
          <button onClick={deleteAccount}>Delete my account</button>
        </div>
      </div>
    </Layout>
  )
}