import { useContext } from "react"
import { authContext } from "../../App"

export const UserContainer = () => {
  const authData = useContext(authContext);

  if (!authData) {
    return null;
  }

  return (
    <>
      {authData.email}
    </>
  )
}