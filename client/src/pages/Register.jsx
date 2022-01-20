import {
  Container,
  Wrapper,
  Form,
  ErrWrapper,
  ErrMsg,
  RegInfo,
  RegTitle,
  RegMsg,
} from "./styles/Register.styled";
import { FormTitle } from "../components/styles/FormTitle.styled";
import { InputAction, Input } from "../components/styles/Input.styled";
import { ButtonAction, Button } from "../components/styles/Button.styled";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../helpers/api";

export default function Register() {
  const history = useHistory();

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirm = useRef();

  const [usernameErrors, setUsernameErrors] = useState("");
  const [emailErrors, setEmailErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [serverErrors, setServerErrors] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(false);

  const resetStates = () => {
    setUsernameErrors("");
    setEmailErrors("");
    setPasswordErrors("");
    setServerErrors("");
    setRegistrationStatus(false);
  };

  const resetRefs = () => {
    username.current.value = null;
    email.current.value = null;
    password.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetStates();

    const user = {
      name: username.current.value,
      email: email.current.value,
      password: password.current.value,
      password_confirmation: confirm.current.value,
    };

    api()
      .post("/register", user)
      .then((res) => {
        setRegistrationStatus(true);
        setTimeout(() => {
          resetStates();
          resetRefs();
          history.push("/login");
        }, 5 * 1000);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          err.response.data.errors.name?.length > 0 && setUsernameErrors(err.response.data.errors.name[0]);
          err.response.data.errors.email?.length > 0 && setEmailErrors(err.response.data.errors.email[0]);
          err.response.data.errors.password?.length > 0 &&
            setPasswordErrors(err.response.data.errors.password[0]);
        } else {
          setServerErrors("Please try again later...");
        }
      });
  };

  return (
    <Container>
      <Wrapper>
        <FormTitle>Register</FormTitle>
        <Form onSubmit={handleSubmit} autoComplete='off'>
          <InputAction>
            <Input type='text' placeholder='Username' ref={username} />
            <ErrMsg showMsg={usernameErrors.length ? "visible" : "hidden"}>
              <p id='regUsernameErrors'>{usernameErrors || 0}</p>
            </ErrMsg>
          </InputAction>
          <InputAction>
            <Input type='email' placeholder='Email' ref={email} />
            <ErrMsg showMsg={emailErrors.length ? "visible" : "hidden"}>
              <p id='regEmailErrors'>{emailErrors || 0}</p>
            </ErrMsg>
          </InputAction>
          <InputAction>
            <Input type='password' placeholder='Password' ref={password} />
            <ErrMsg showMsg={passwordErrors.length ? "visible" : "hidden"}>
              <p id='regPasswordErrors'>{passwordErrors || 0}</p>
            </ErrMsg>
          </InputAction>
          <InputAction>
            <Input type='password' placeholder='Confirm Password' ref={confirm} />
          </InputAction>
          <ErrWrapper>
            <ErrMsg showMsg={serverErrors ? "visible" : "hidden"}>
              <p id='regServerErrors'>{serverErrors || 0}</p>
            </ErrMsg>
          </ErrWrapper>
          <ButtonAction>
            <Button type='submit'>Sign Up</Button>
          </ButtonAction>
        </Form>
        <RegInfo>
          <RegTitle showMsg={registrationStatus ? "visible" : "hidden"}>
            Thank you, your registration was successfull...
          </RegTitle>
          <RegMsg showMsg={registrationStatus ? "visible" : "hidden"}>Redirecting to Login page...</RegMsg>
        </RegInfo>
      </Wrapper>
    </Container>
  );
}
