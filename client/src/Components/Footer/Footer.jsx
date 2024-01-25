import { FormattedMessage } from "react-intl"

export const Footer = ({ theme, switchTheme, switchLanguage }) => {
  return (
    <footer data-theme={theme}>
      <div>
        <div>github</div>
        <div>politique de confidentialité</div>
      </div>
      <div>
        <div>
          <span className="bolded"><FormattedMessage id="footer_theme" defaultMessage={"Theme:"}/></span> <button className="footer_action" onClick={() => switchTheme('light')}><FormattedMessage id="footer_theme-light" defaultMessage={"Light"} /></button> | <button className="footer_action" onClick={() => switchTheme('dark')}><FormattedMessage id="footer_theme-dark" defaultMessage={"Dark"} /></button>
        </div>
        <div>
          <span className="bolded"><FormattedMessage id="footer_language" defaultMessage={"Language"} /></span> <button className="footer_action" onClick={() => switchLanguage('en')}>English</button> | <button className="footer_action" onClick={() => switchLanguage('fr')}>Français</button>
        </div>
      </div>
    </footer>
  )
}