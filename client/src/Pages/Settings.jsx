import { useContext } from "react"
import { authContext } from "../App"
// Components
import { Layout } from "../Components/Layout"
import { ChangeNameForm } from "../Components/Forms/ChangeNameForm"

export const SettingsPage = () => {
  const authData = useContext(authContext);

  return (
    <Layout>
      <div className="content settings-page">
        <ChangeNameForm authData={authData} />
        <div className="delete-profile_container">
          <h3>Delete your profile and data:</h3>
          <div className="warning-message"><span className="bolded">Warning:</span> this action is permanent, your data will be completely deleted.</div>
          <button>Delete my profile</button>
        </div>
        
      </div>
    </Layout>
  )
}