import { useState, useEffect, useContext } from "react"
import { authContext } from "../App"

export const TimeLinePage = () => {
  const [posts, setPosts] = useState();
  const authData = useContext(authContext);

  const fetchPosts = async () => {
    if (!authData) {
      return;
    }
    await fetch('http://localhost:3000/posts', {
      headers : {
        authorization: authData.sub,
      }
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [authData]);

  return (
    <>
      <h1>Timeline</h1>
    </>
  )
}