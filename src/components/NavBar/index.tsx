import { Box, AppBar, Typography, Tabs, Tab } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

type Props = {
  routes: { [name: string]: string };
};

const tabStyle = {
  color: "yellow",
  fontSize: "18px",
  fontWeight: 600,
  "&:hover": {
    color: "orange",
  },
};

const NavBar: FC<Props> = ({ routes }) => {
  return (
    <Box padding={1}>
      <AppBar position='static'>
        <Box padding={2}>
          <Typography variant='h4'>Blog App</Typography>
          <nav>
            <Tabs>
              {Object.entries(routes).map(([name, path]) => {
                return (
                  <Tab
                    sx={{ ...tabStyle }}
                    disableRipple
                    label={name}
                    component={Link}
                    to={path}
                  />
                );
              })}
            </Tabs>
          </nav>
        </Box>
      </AppBar>
    </Box>
  );
};

export default NavBar;
