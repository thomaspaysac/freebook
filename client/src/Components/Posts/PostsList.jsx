import { useEffect, useState, useContext } from "react";
import { authContext } from "../../App";
import { PostSingle } from "./PostSingle";

export const PostsList = ({ user_ID, update }) => {
  const [posts, setPosts] = useState();
  const authData = useContext(authContext);

  const fetchPosts = async () => {
    //const req = await fetch(`http://localhost:3000/posts/${user_ID}`);
    const req = await fetch(`https://freebook.up.railway.app/posts/${user_ID}`);
    const res = await req.json();
    setPosts(res);
  }

  useEffect(() => {
    fetchPosts();
  }, [user_ID, update])

  if (!posts || !user_ID) {
    return null
  } else if (!authData) {
    return (
      <div>
        {
          posts.map(el => {
            return (
              <PostSingle key={el.id} post={el} user_ID={null} post_type={"profile-post"} />
            )
          })
        }
      </div>
    )  
  }

  return (
    <div>
      {
        posts.map(el => {
          return (
            <PostSingle key={el.id} post={el} user_ID={authData.sub} post_type={"profile-post"} />
          )
        })
      }
    </div>
  )
}