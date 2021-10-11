import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IPost from "../../models/IPost";
import Post from "../../components/Post";
import { postsReceive, selectPosts } from "./blogSlice";

const Posts: FC = () => {
  const selector = useSelector;
  const dispatch = useDispatch();
  const posts = selector(selectPosts) as IPost[];

  useEffect(() => {
    dispatch(postsReceive());
  }, [dispatch]);

  return (
    <div>
      {posts &&
        Object.values(posts).map(({ id, title, body, comments }) => (
          <Post id={id} title={title} body={body} comments={comments} />
        ))}
    </div>
  );
};

export default Posts;
