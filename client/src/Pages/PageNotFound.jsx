import { Layout } from "../Components/Layout";
// Assets
import error_icon from "../assets/icons/404-error.png";
import icon_white from "../assets/icons/404-error_white.png";

export const PageNotFound = ({ theme }) => {
  return (
    <Layout>
      <div className="content not-found" data-theme={theme}>
        <h3>Page not found.</h3>
        <img src={theme === 'dark' ? icon_white : error_icon} />
      </div>
    </Layout>
  )
}