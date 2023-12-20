import { useEffect, useState } from "react";

export const PostsList = ({ user_ID }) => {
  const [posts, setPosts] = useState();

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
  }

  return (
    <div>
      {
        posts.map(el => {
          return (
            <div key={el.id} onClick={() => console.log(el)}>
              <div>{el.text}</div>
            </div>
          )
        })
      }
    </div>
  )
}