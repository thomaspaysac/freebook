import { useState, useEffect } from "react"

export const ProtectedPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const verifyToken = async () => {
    const req = await fetch('http://localhost:3000/protected');
    if (req.status === 200) {
      const res = await req.json();
      setIsVerified(true);
      setUserInfo(res.email);
    } else {
      setIsVerified(false);
    }
  }

  useEffect(() => {
    verifyToken();
  }, [])

  if (!isVerified) {
    return (
      <>
        <h1>Protected Page</h1>
      </>
    )
  } else {
    return (
      <>
        <h1>Welcome !</h1>
        <div>{userInfo}</div>
      </>
    )
  }
}