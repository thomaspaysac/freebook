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
    const req = await fetch('http://localhost:3000/posts/feed', {
      headers : {
        authorization: authData.sub,
      }
    });
    const res = await req.json();
    setPosts(res);
  }

  useEffect(() => {
    fetchPosts()
  }, [authData]);

  const PostsList = () => {
    if (!posts || !authData) {
      return (
        <div onClick={() => console.log(posts, authData)}>
          Loading...
        </div>
      );
    }

    return (
      <div>
        {
          posts.map(el => {
            return (
              <TimelinePost key={el.id} post={el} user_ID={authData.sub} />
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