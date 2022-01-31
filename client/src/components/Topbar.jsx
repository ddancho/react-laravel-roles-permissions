import { Container, Wrapper, Left, Logo, Right, LinkAction, Logout, User } from "./styles/Topbar.styled";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../redux/user";
import { ModelRoutes } from "../helpers/modelRoutes";
import { UserActions } from "../helpers/modelActions";
import IsAuthorized from "./IsAuthorized";
import api from "../helpers/api";

export default function Topbar() {
  const location = useLocation();
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState("/");

  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    api()
      .get("/api/user")
      .then((res) => {
        dispatch(setUserInfo({ ...res.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    setCurrentPath((prev) => (prev = location.pathname));
  }, [location]);

  const handleLogout = () => {
    api()
      .post("/logout")
      .then(() => {
        dispatch(setUserInfo({}));
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <LinkAction current={currentPath === "/"}>
            <Link to='/'>
              <Logo>Tasks</Logo>
            </Link>
          </LinkAction>
          <IsAuthorized model={ModelRoutes.user} action={UserActions.accessAdminPage}>
            <LinkAction current={currentPath === "/admin/home"}>
              <Link to='/admin/home'>
                <Logo>Admin Panel</Logo>
              </Link>
            </LinkAction>
          </IsAuthorized>
        </Left>
        <Right>
          {user.name ? (
            <>
              <User>
                {user.name} ({user.role})
              </User>
              <Logout onClick={handleLogout}>Logout</Logout>
            </>
          ) : (
            <>
              <LinkAction current={currentPath === "/login"}>
                <Link to='/login'>Login</Link>
              </LinkAction>
              <LinkAction current={currentPath === "/register"}>
                <Link to='/register'>Register</Link>
              </LinkAction>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}
