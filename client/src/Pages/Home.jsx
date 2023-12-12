import { Link } from "react-router-dom";
import { useState } from "react";
import { Layout } from "../Components/Layout";
import { LoginForm } from "../Components/Forms/LoginForm";
import { SignupModal } from "../Components/Forms/SignupModal";

export const HomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Layout>
      <div className="content homepage">
        <div>
          <h1 className="logo">freebook</h1>
          <h2>Connect with your friends, <br />Make new ones</h2>
        </div>
        <div className="login-container">
          <LoginForm />
        </div>
      </div>
      <SignupModal open={modalOpen} />
    </Layout>
  )
}