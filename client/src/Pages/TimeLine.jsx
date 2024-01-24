import { useState, useEffect, useContext } from "react";
import { authContext } from "../App";
import { FormattedMessage } from 'react-intl';
// Components
import { PostSingle } from "../Components/Posts/PostSingle";
import { Layout } from "../Components/Layout";
import { NewPostForm } from "../Components/Forms/NewPost";

export const TimeLinePage = ({theme}) => {
  const [posts, setPosts] = useState();
  const [update, setUpdate] = useState(0);
  const authData = useContext(authContext);

  const updateComponent = () => {
    setUpdate((prevCounter) => prevCounter + 1);
  }

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
  }, [authData, update]);

  const PostsList = () => {
    if (!posts || !authData) {
      return null;
    }

    return (
      <div className="timeline-posts_container">
        {
          posts.map(el => {
            return (
              <PostSingle key={el.id} post={el} user_ID={authData.sub} post_type={"timeline-post"} />
            )
          })
        }
      </div>
    )
  }

  return (
    <Layout>
      <div className="content timeline-page" data-theme={theme}>
        <div className="new-post_container">
          <h3><FormattedMessage id="new-post_title" defaultMessage="What's on your mind?" /></h3>
          <NewPostForm update={updateComponent} />
        </div>
        <h3><FormattedMessage id="feed_title" defaultMessage="Your feed" /></h3>
        <PostsList />
      </div>
    </Layout>
  )
}