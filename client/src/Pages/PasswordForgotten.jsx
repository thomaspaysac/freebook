// Components
import { Layout } from "../Components/Layout";
import { RecoverForm } from "../Components/Forms/RecoverForm";

export const PasswordForgottenPage = () => {
  return (
    <Layout>
      <div className="content recover">
        <RecoverForm />
      </div>
    </Layout>
  )
}