import { Box, Typography } from "@mui/material";
import { FC } from "react";
import FormPost from "../../components/FormPost";

const NewPost: FC = () => {
  return (
    <Box display='flex' flexDirection='column' padding={3}>
      <Typography variant='h3'>Create new post</Typography>
      <FormPost />
    </Box>
  );
};

export default NewPost;
