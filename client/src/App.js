import { Container } from "./pages/styles/App.styled";
import Globals from "./pages/styles/Globals.styled";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { userInfo: user } = useSelector((state) => state.user);

  return (
    <Container>
      <Router>
        <Globals />
        <Topbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/register'>
            {user.name !== undefined && <Redirect to='/' />}
            <Register />
          </Route>
          <Route exact path='/login'>
            {user.name !== undefined && <Redirect to='/' />}
            <Login />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
