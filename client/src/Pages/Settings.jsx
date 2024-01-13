import { Layout } from "../Components/Layout"
import { ChangeNameForm } from "../Components/Forms/ChangeNameForm"

export const SettingsPage = () => {
  return (
    <Layout>
      <div className="content settings-page">
        Settings
        <h3>Change your name:</h3>
        <ChangeNameForm />
        <h3>Delete your profile and data:</h3>
        <div><span className="bolded">Warning:</span> this action is permanent, your data will be completely deleted.</div>
        <button>Delete my profile</button>
      </div>
    </Layout>
  )
}