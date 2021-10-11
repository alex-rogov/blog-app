import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDelete, selectPostById } from "../../features/blog/blogSlice";
import { Redirect } from "react-router-dom";
import IPost from "../../models/IPost";
import Comment from "../../components/Comment";
import FormPost from "../../components/FormPost";
import FormComment from "../../components/FormComment";
import {
  Box,
  ButtonGroup,
  Button,
  Typography,
  List,
  Divider,
} from "@mui/material";

const SinglePost: FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector;
  const post = selector(selectPostById(+postId)) as IPost;

  useEffect(() => {
    setEditing(false);
  }, [post]);

  if (!post) {
    return <Redirect to='/' />;
  }

  return (
    <Box display='flex' flexDirection='column' padding={3}>
      <Typography variant='h4'>{post.title}</Typography>
      {editing && <FormPost id={+postId} title={post.title} body={post.body} />}
      {!editing && (
        <ButtonGroup variant='outlined' sx={{ padding: 1 }}>
          <Button onClick={() => setEditing(true)}>
            <Typography variant='body1'>Edit</Typography>
          </Button>
          <Button
            sx={{ "&:hover": { color: "red" } }}
            onClick={() => dispatch(postDelete({ id: +postId }))}
          >
            <Typography variant='body2'>Delete</Typography>
          </Button>
        </ButtonGroup>
      )}
      <Typography variant='h6'>{post.body}</Typography>
      <Typography
        variant='h5'
        sx={{ marginTop: 3 }}
      >{`Comments ${post.comments.length} :`}</Typography>

      {post.comments.length > 0 && (
        <List>
          {post.comments.map(({ body }) => (
            <>
              <Comment body={body} />
              <Divider />
            </>
          ))}
        </List>
      )}
      <FormComment postId={+postId} />
    </Box>
  );
};

export default SinglePost;
