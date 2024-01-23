// Components
import { Layout } from "../Components/Layout";
import { RecoverForm } from "../Components/Forms/RecoverForm";

export const PasswordForgottenPage = ({theme}) => {
  return (
    <Layout>
      <div className="content recover" data-theme={theme}>
        <RecoverForm />
      </div>
    </Layout>
  )
}