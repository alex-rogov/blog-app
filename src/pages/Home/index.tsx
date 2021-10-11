import { Container, Box } from "@mui/material";
import { FC } from "react";
import Posts from "../../features/blog/Posts";

const Main: FC = () => {
  return (
    <Container maxWidth='md'>
      <Box padding={3}>
        <Posts />
      </Box>
    </Container>
  );
};

export default Main;
