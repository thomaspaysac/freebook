import { Layout } from "../Components/Layout";
import { FormattedMessage } from "react-intl";
// Assets
import error_icon from "../assets/icons/404-error.png";
import icon_white from "../assets/icons/404-error_white.png";

export const PageNotFound = ({ theme }) => {
  return (
    <Layout>
      <div className="content error-page" data-theme={theme}>
        <h3><FormattedMessage id="not-found" defaultMessage={"Page not found."}/></h3>
        <img src={theme === 'dark' ? icon_white : error_icon} />
      </div>
    </Layout>
  )
}