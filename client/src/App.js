import { Container } from "./pages/styles/App.styled";
import Globals from "./pages/styles/Globals.styled";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EditTask from "./pages/EditTask";
import CreateTask from "./pages/CreateTask";
import PageNotFound from "./pages/PageNotFound";
import AdminPage from "./pages/AdminPage";
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
          <Route exact path={`/tasks/:id(\\d+)/edit`}>
            <EditTask />
          </Route>
          <Route exact path='/tasks/create'>
            <CreateTask />
          </Route>
          <Route exact path='/admin/home'>
            <AdminPage />
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
