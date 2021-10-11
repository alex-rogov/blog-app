import { FC } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFound: FC = () => {
  return (
    <Box padding={3}>
      <Typography variant='h3'>Error 404</Typography>

      <Typography variant='h4'>Requested material was not found.</Typography>

      <Button variant='outlined' size='large' component={Link} to='/'>
        Return Home
      </Button>
    </Box>
  );
};

export default NotFound;
