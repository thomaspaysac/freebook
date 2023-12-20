import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "../Components/Layout";
import { LoginForm } from "../Components/Forms/LoginForm";
import { SignupModal } from "../Components/Forms/SignupModal";

export const HomePage = () => {
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
      <div className="content homepage">
        <div>
          <h1 className="logo">freebook</h1>
          <h2 className={`${animate ? 'animated' : ''}`}>Connect with your friends, <br /><span>Make new ones</span></h2>
        </div>
        <div className="login-container">
          <LoginForm openSignup={openModal} />
        </div>
      </div>
      <SignupModal open={modalOpen} closeSignup={closeModal} />
    </Layout>
  )
}