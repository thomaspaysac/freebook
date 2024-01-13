import { useState } from "react";

export const ChangeNameForm = ({ authData }) => {
  const [successState, setSuccessState] = useState();
  
  const updateName = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const req = await fetch(`http://localhost:3000/user/${authData.sub}/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: authData.sub,
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log(res);
    if (res.status === 200) {
      setSuccessState("success");
    } else {
      setSuccessState("error");
    }
  }

  const SuccessFeedback = () => {
    if (!successState) {
      return null;
    } else if (successState === "success") {
      return (
        <div className="success-container">
          Your name has been successfully changed.
        </div>
      )
    } else {
      return (
        <div className="error-container">
          There was an error, please try again.
        </div>
      )
    }
  }

  return (
    <div className="change-name-form_container">
      <h3>Change your name</h3>
      <form onSubmit={updateName}>
        <input type="text" name="first_name" id="first_name" placeholder="First name" minLength={2} maxLength={20} />
        <input type="text" name="last_name" id="last_name" placeholder="Last name" minLength={2} maxLength={20} />
        <button>Change my name</button>
      </form>
      <SuccessFeedback />
    </div>
  )
}