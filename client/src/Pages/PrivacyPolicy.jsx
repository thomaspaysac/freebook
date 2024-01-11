import { Layout } from "../Components/Layout"

export const PrivacyPolicyPage = () => {
  return (
    <Layout>
    <div className="content privacy-policy">
      <h1>Privacy Policy for Freebook</h1>
      <h3>Last Updated: january 11 2024</h3>
      <p>Thank you for using Freebook. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you access or use our website and services. By using Freebook, you agree to the terms outlined in this Privacy Policy.</p>
      <h2>Information We Collect</h2>
        <h3>1. Account Information</h3>
          <p>To use Freebook, you may need to create an account. We collect information such as:
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
          <p>We collect content you post on Freebook, including:
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
        <p>Freebook is not intended for individuals under the age of 13. We do not knowingly collect personal information from children.</p>

      <h2>Changes to this Privacy Policy</h2>
        <p>We may update this Privacy Policy periodically. Check the "Last Updated" date for the latest version.</p>

      <h2>Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:juneco.services@gmail.com">juneco.services@gmail.com</a>.</p>
    </div>
    </Layout>
  )
}