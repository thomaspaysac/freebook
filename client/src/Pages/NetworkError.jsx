import { Layout } from "../Components/Layout"
// Assets
import error_icon from "../assets/icons/503-error.png";
import icon_white from "../assets/icons/503-error_white.png"

export const NetworkErrorPage = ({ theme }) => {
  return (
    <Layout>
      <div className="content error-page" data-theme={theme}>
        <h3>Network error, please try again later.</h3>
        <img src={theme === 'dark' ? icon_white : error_icon} />
      </div>
    </Layout>
  )
}