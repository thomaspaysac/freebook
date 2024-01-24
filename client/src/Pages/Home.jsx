import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormattedMessage } from 'react-intl';
// Components
import { Layout } from "../Components/Layout";
import { LoginForm } from "../Components/Forms/LoginForm";
import { SignupModal } from "../Components/Forms/SignupModal";

export const HomePage = ({theme}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, [])

  const openModal = () => {
    setModalOpen(true);
    document.getElementById('first_name').focus()
  }

  const closeModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
    return;
  }

  return (
    <Layout>
      <div className="content homepage" data-theme={theme}>
        <div>
          <h1 className="logo">freebook</h1>
          <h2 className={`${animate ? 'animated' : ''}`}>
            <FormattedMessage id="slogan_1" defaultMessage="Connect with your friends," />
            <br /><span><FormattedMessage id="slogan_2" defaultMessage="make new ones" /></span>
          </h2>
        </div>
        <div className="login-container">
          <LoginForm openSignup={openModal} />
          <Link to='/privacy' className="policy-link"><FormattedMessage id="policy_link" defaultMessage="Privacy policy" /></Link>
        </div>
      </div>
      <SignupModal open={modalOpen} closeSignup={closeModal} theme={theme} />
    </Layout>
  )
}