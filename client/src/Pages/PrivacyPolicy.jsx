import { Layout } from "../Components/Layout"

export const PrivacyPolicyPage = ({theme, locale}) => {
  if (locale === 'fr') {
    return (
      <Layout>
      <div className="content privacy-policy" data-theme={theme}>
        <h1>Politique de confidentialité de Talkbook</h1>
        <h3>Dernière mise à jour : 24 janvier 2024</h3>
        <p>Merci d'utiliser Talkbook. La présente politique de confidentialité décrit la manière dont nous recueillons, utilisons, divulguons et protégeons vos informations personnelles lorsque vous accédez à notre site web et à nos services ou que vous les utilisez. En utilisant Talkbook, vous acceptez les conditions décrites dans cette politique de confidentialité.</p>
        <h2>Informations recueillies</h2>
          <h3>1. Informations sur le compte</h3>
            <p>Pour utiliser Talkbook, vous pouvez avoir besoin de créer un compte. Nous recueillons des informations telles que :
              <ul>
                <li>votre nom</li>
                <li>votre adresse e-mail</li>
                <li>votre mot de passe</li>
              </ul>
            </p>
        
          <h3>2. Informations sur le profil</h3>
            <p>Vous avez la possibilité de fournir des informations supplémentaires pour votre profil, notamment :
              <ul>
                <li>une photo de profile</li>
                <li>une image d'arrière-plan de profile</li>
              </ul>
            </p>
  
          <h3>3. Contenu utilisateur</h3>
            <p>Nous collectons le contenu que vous publiez sur Talkbook, y compris :
              <ul>
                <li>posts textuels</li>
                <li>images</li>
                <li>commentaires</li>
                <li>likes</li>
              </ul>
            </p>
  
          <h3>4. Données d'utilisation</h3>
            <p>Nous ne collectons pas automatiquement d'informations sur l'utilisation du site web par les utilisateurs, telles que l'adresse IP ou les informations relatives à l'appareil.</p>
  
        <h2>Comment nous utilisons vos informations</h2>
          <p>Nous utilisons vos informations pour permettre à d'autres utilisateurs d'entrer en contact avec vous.</p>
  
        <h2>Partage des informations</h2>
          <p>Nous pouvons partager vos informations avec :
            <ul>
              <li>autres utilisateurs, conformément à vos paramètres de confidentialité</li>
              <li>fournisseurs de services pour la fonctionnalité du site web</li>
              <li>autorités légales en conformité avec les lois applicables</li>
            </ul>
          </p>
  
        <h2>Cookies et technologies similaires</h2>
          <p>Nous n'utilisons pas de cookies. Un jeton est stocké dans la mémoire locale lors de la connexion pour l'authentification de l'utilisateur.</p>
  
        <h2>Vos choix</h2>
          <p>Vous pouvez mettre à jour vos informations et supprimer vos données.</p>
  
        <h2>Sécurité</h2>
          <p>Les données privées, telles que l'adresse électronique et le mot de passe, restent confidentielles et ne sont pas exposées aux autres utilisateurs. Nous mettons en œuvre des mesures pour protéger vos informations, mais aucun système n'est totalement infaillible. Veuillez prendre les mesures nécessaires pour sécuriser votre compte.</p>
  
        <h2>Vie privée des enfants</h2>
          <p>Talkbook n'est pas destiné aux personnes de moins de 13 ans. Nous ne recueillons pas sciemment d'informations personnelles auprès d'enfants.</p>
  
        <h2>Modifications de la politique de confidentialité</h2>
          <p>Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Vérifiez la date de la "dernière mise à jour" pour connaître la dernière version.</p>
  
        <h2>Nous contacter</h2>
          <p>Si vous avez des questions ou des préoccupations concernant la présente politique de confidentialité, veuillez nous contacter à l'adresse suivante : <a href="mailto:juneco.services@gmail.com">juneco.services@gmail.com</a>.</p>
      </div>
      </Layout>
    )
  }

  return (
    <Layout>
    <div className="content privacy-policy" data-theme={theme}>
      <h1>Privacy Policy for Talkbook</h1>
      <h3>Last Updated: january 24 2024</h3>
      <p>Thank you for using Talkbook. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you access or use our website and services. By using Talkbook, you agree to the terms outlined in this Privacy Policy.</p>
      <h2>Information We Collect</h2>
        <h3>1. Account Information</h3>
          <p>To use Talkbook, you may need to create an account. We collect information such as:
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Password</li>
            </ul>
          </p>
      
        <h3>2. Profile Information</h3>
          <p>You have the option to provide additional information for your profile, including:
            <ul>
              <li>Profile picture</li>
              <li>Background picture</li>
            </ul>
          </p>

        <h3>3. User Content</h3>
          <p>We collect content you post on Talkbook, including:
            <ul>
              <li>Text</li>
              <li>Photos</li>
              <li>Comments</li>
              <li>Likes</li>
            </ul>
          </p>

        <h3>4. Usage Data</h3>
          <p>We do not automatically collect any information about users' usage of the website, such as IP address or device information.</p>

      <h2>How We Use Your Information</h2>
        <p>We use your information to allow other users to get in contact with you.</p>

      <h2>Information Sharing</h2>
        <p>We may share your information with:
          <ul>
            <li>Other users as per your privacy settings</li>
            <li>Service providers for website functionality</li>
            <li>Legal authorities in compliance with applicable laws</li>
          </ul>
        </p>

      <h2>Cookies and Similar Technologies</h2>
        <p>We do not use cookies. A token is stored in local storage upon logging in for user authentication.</p>

      <h2>Your Choices</h2>
        <p>You can update your information, and delete your data.</p>

      <h2>Security</h2>
        <p>Private data, such as email address and password, are kept private and not exposed to other users. We implement measures to protect your information, but no system is entirely foolproof. Please take appropriate steps to secure your account.</p>

      <h2>Children's Privacy</h2>
        <p>Talkbook is not intended for individuals under the age of 13. We do not knowingly collect personal information from children.</p>

      <h2>Changes to this Privacy Policy</h2>
        <p>We may update this Privacy Policy periodically. Check the "Last Updated" date for the latest version.</p>

      <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:juneco.services@gmail.com">juneco.services@gmail.com</a>.</p>
    </div>
    </Layout>
  )
}