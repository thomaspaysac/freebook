import { useEffect, useState, useContext } from "react";
import { authContext } from "../../App";
import { ProfilePost } from "./ProfilePost";

export const PostsList = ({ user_ID }) => {
  const [posts, setPosts] = useState();
  const authData = useContext(authContext);

  const fetchPosts = async () => {
    const req = await fetch(`http://localhost:3000/posts/${user_ID}`);
    const res = await req.json();
    setPosts(res);
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  if (!posts || !user_ID) {
    return null
  } else if (!authData) {
    return (
      <div>
        {
          posts.map(el => {
            return (
              <ProfilePost key={el.id} post={el} user_ID={null} />
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
            <ProfilePost key={el.id} post={el} user_ID={authData.sub} />
          )
        })
      }
    </div>
  )
}