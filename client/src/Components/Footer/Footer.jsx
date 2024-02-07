import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
// Assets
import githubIcon from "../../assets/icons/github.png";

export const Footer = ({ theme, switchTheme, switchLanguage }) => {
  return (
    <footer data-theme={theme}>
      <div>
        <div>
          <Link className="github-link" target="_blank" to="https://github.com/thomaspaysac"><img src={githubIcon} alt='' /> <div>GitHub</div></Link>
        </div>
        <div>
          <Link to="/privacy"><FormattedMessage id="footer_privacy" defaultMessage={"Privacy policy"} /></Link>
        </div>
      </div>
      <div className="separator"></div>
      <div>
        <div>
          <span className="bolded"><FormattedMessage id="footer_theme" defaultMessage={"Theme:"}/></span> <button className="footer_action" onClick={() => switchTheme('light')}><FormattedMessage id="footer_theme-light" defaultMessage={"Light"} /></button> | <button className="footer_action" onClick={() => switchTheme('dark')}><FormattedMessage id="footer_theme-dark" defaultMessage={"Dark"} /></button> | <button onClick={() => switchTheme('red')}><FormattedMessage id="footer_theme-red" defaultMessage={"Red"} /></button>
        </div>
        <div>
          <span className="bolded"><FormattedMessage id="footer_language" defaultMessage={"Language:"} /></span> <button className="footer_action" onClick={() => switchLanguage('en')}>English</button> | <button className="footer_action" onClick={() => switchLanguage('fr')}>Français</button>
        </div>
      </div>
    </footer>
  )
}