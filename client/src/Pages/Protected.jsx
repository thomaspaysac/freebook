import { useContext } from "react"
import { authContext } from "../App";

export const ProtectedPage = () => {
  const authData = useContext(authContext);

  const logData = () => {
    console.log(authData);
  }

  if (!authData) {
    return (
      <>
        <h1>Protected Page</h1>
      </>
    )
  } else {
    return (
      <>
        <h1>Welcome !</h1>
        <div>{authData.email}</div>
        <button onClick={logData}>Get data</button>
      </>
    )
  }
}