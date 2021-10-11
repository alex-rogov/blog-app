import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SinglePost from "./pages/SinglePost";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import NavBar from "./components/NavBar";
import { Container, Paper } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth='lg'>
        <Paper>
          <NavBar
            routes={{
              Home: "/",
              "New Post": "/post/new",
            }}
          />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/post/new' component={NewPost} />
            <Route exact path='/post/:postId' component={SinglePost} />
            <Route path='/404' component={NotFound} />
            <Redirect to='/404' />
          </Switch>
        </Paper>
      </Container>
    </Router>
  );
}

export default App;
