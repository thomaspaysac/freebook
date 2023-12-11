import { useState, useEffect, useContext } from "react"
import { authContext } from "../App"
import { TimelinePost } from "../Components/Posts/TimelinePost";

export const TimeLinePage = () => {
  const [posts, setPosts] = useState();
  const authData = useContext(authContext);

  const fetchPosts = async () => {
    if (!authData) {
      return;
    }
    const req = await fetch('http://localhost:3000/posts', {
      headers : {
        authorization: authData.sub,
      }
    });
    const res = await req.json();
    setPosts(res);
    console.log(res)
  }

  useEffect(() => {
    fetchPosts()
  }, [authData]);

  useEffect(() => {

  }, [posts]);

  const PostsList = () => {
    useEffect(() => {

    }, [posts])

    if (!posts) {
      return (
        <>
          Loading...
        </>
      );
    }

    return (
      <div>
        {
          posts.map(el => {
            return (
              <TimelinePost post={el} />
            )
          })
        }
      </div>
      
    )
  }

  return (
    <>
      <h1>Timeline</h1>
      <PostsList />
    </>
  )
}