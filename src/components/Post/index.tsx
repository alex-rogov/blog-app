import { FC } from "react";
import IPost from "../../models/IPost";
import { Link } from "react-router-dom";
import {
  Box,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
type Props = IPost;

const Post: FC<Props> = ({ id, title, body, comments }) => {
  return (
    <Box component='div'>
      <CardContent>
        <Typography variant='h5' component='div'>
          {title}
        </Typography>
        <Typography
          variant='h6'
          sx={{ color: "text.secondary" }}
          component='div'
        >
          {body}
        </Typography>
      </CardContent>
      <CardActions>
        <Box display='flex' sx={{ "> *": { padding: 1.5, margin: 3 } }}>
          <Button variant='contained' component={Link} to={`post/${id}`}>
            Go to post
          </Button>
          <Typography variant='h5' component='div'>
            💬: {comments.length ?? 0}
          </Typography>
        </Box>
      </CardActions>
    </Box>
  );
};

export default Post;
