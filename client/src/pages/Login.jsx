import {
  Container,
  Wrapper,
  Form,
  ErrWrapper,
  ErrMsg,
  LogInfo,
  LogTitle,
  LogMsg,
} from "./styles/Login.styled";
import { FormTitle } from "../components/styles/FormTitle.styled";
import { InputAction, Input } from "../components/styles/Input.styled";
import { ButtonAction, Button } from "../components/styles/Button.styled";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setUserInfo } from "../redux/user";
import api from "../helpers/api";

export default function Login() {
  const history = useHistory();

  const email = useRef();
  const password = useRef();

  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [serverErrors, setServerErrors] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);

  const dispatch = useDispatch();

  const resetStates = () => {
    setEmailErrors("");
    setPasswordErrors("");
    setServerErrors("");
    setLoginStatus(false);
  };

  const resetRefs = () => {
    email.current.value = null;
    password.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    resetStates();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    api()
      .get("/sanctum/csrf-cookie")
      .then(() => {
        api()
          .post("/login", user)
          .then((res) => {
            setLoginStatus(true);
            setTimeout(() => {
              resetStates();
              resetRefs();
              dispatch(setUserInfo({ ...res.data.user }));
              history.push("/");
            }, 5 * 1000);
          })
          .catch((err) => {
            if (err.response.status === 422) {
              err.response.data.errors?.email?.length > 0
                ? setEmailErrors(err.response.data.errors.email)
                : setEmailErrors("Invalid credentials");
              err.response.data.errors?.password?.length > 0
                ? setPasswordErrors(err.response.data.errors.password)
                : setPasswordErrors("Invalid credentials");
            } else {
              setServerErrors("Please try again later...");
            }
          });
      })
      .catch((err) => setServerErrors("Network Error : connection refused"));
  };

  return (
    <Container>
      <Wrapper>
        <FormTitle>Login</FormTitle>
        <Form onSubmit={handleSubmit} autoComplete='off'>
          <InputAction>
            <Input type='email' placeholder='Email' ref={email} />
            <ErrMsg showMsg={emailErrors.length ? "visible" : "hidden"}>
              <p id='logEmailErrors'>{emailErrors || 0}</p>
            </ErrMsg>
          </InputAction>
          <InputAction>
            <Input type='password' placeholder='Password' ref={password} />
            <ErrMsg showMsg={passwordErrors.length ? "visible" : "hidden"}>
              <p id='logPasswordErrors'>{passwordErrors || 0}</p>
            </ErrMsg>
          </InputAction>
          <ButtonAction>
            <Button type='submit'>Sign Up</Button>
          </ButtonAction>
          <ErrWrapper>
            <ErrMsg showMsg={serverErrors ? "visible" : "hidden"}>
              <p id='logServerErrors'>{serverErrors || 0}</p>
            </ErrMsg>
          </ErrWrapper>
        </Form>
        <LogInfo>
          <LogTitle showMsg={loginStatus ? "visible" : "hidden"}>
            Thank you, your login was successfull...
          </LogTitle>
          <LogMsg showMsg={loginStatus ? "visible" : "hidden"}>Redirecting to Home page...</LogMsg>
        </LogInfo>
      </Wrapper>
    </Container>
  );
}
