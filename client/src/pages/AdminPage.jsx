import { Container, Wrapper, AdminPanel, APForm, ScsMsg } from "./styles/AdminPage.styled";
import { InputAction, InputWrapper, ErrMsg } from "./styles/CreateTask.styled";
import { SearchInput } from "../components/styles/SearchSuggestions.styled";
import { Button } from "../components/styles/Button.styled";
import SearchSuggestions from "../components/SearchSuggestions";
import { useEffect, useState, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import api from "../helpers/api";
import debounce from "lodash/debounce";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  const userNameRef = useRef();

  const history = useHistory();

  useEffect(() => {
    api()
      .get("/api/users/isAuthorized/toAccessAdminPage")
      .then((res) => {})
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          history.push("/");
        }
      });
  }, [history]);

  const searchHandler = (e) => {
    if (e.target.value) {
      api()
        .get("/api/users/autocomplete-search", {
          params: {
            search: e.target.value,
          },
        })
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setUsers([]);
  };

  const debouncedSearchHandler = useMemo(() => debounce(searchHandler, 500), []);

  useEffect(() => {
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [debouncedSearchHandler]);

  const handleClickSuggestion = (id, name) => {
    setUserId(id);
    userNameRef.current.value = name;
    setUsers([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      userId: userId,
    };

    api()
      .post(`/api/users/updateRole/${userId}`, user)
      .then((res) => {
        setErrors(null);
        setSuccess("User role successfully updated to Administrator role !");
      })
      .catch((err) => {
        setErrors(
          err.response.data.errors
            ? err.response.data.errors
            : { error: ["Something went wrong , please try later !"] }
        );
        setSuccess(null);
      });
  };

  return (
    <Container>
      <Wrapper>
        <AdminPanel>
          <h1>Update User Role</h1>
          <p>Access granted to Super Admin only !</p>
          <APForm autoComplete='off' onSubmit={handleSubmit}>
            <InputAction>
              <InputWrapper>
                <SearchInput
                  type='text'
                  placeholder='Update User to Admin'
                  ref={userNameRef}
                  onChange={debouncedSearchHandler}
                />
                {users.length > 0 && (
                  <SearchSuggestions users={users} onClickSuggestion={handleClickSuggestion} top={260} />
                )}
                <span>
                  {errors?.userId ? <ErrMsg show={errors.userId.length > 0}>{errors.userId[0]}</ErrMsg> : 0}
                </span>
              </InputWrapper>
            </InputAction>
            <InputAction>
              <Button type='submit'>Update</Button>
            </InputAction>
            <InputWrapper>
              <span>{success ? <ScsMsg show={success !== null}>{success}</ScsMsg> : 0}</span>
            </InputWrapper>
            <InputWrapper>
              <span>
                {errors?.error ? <ErrMsg show={errors.error.length > 0}>{errors.error[0]}</ErrMsg> : 0}
              </span>
            </InputWrapper>
          </APForm>
        </AdminPanel>
      </Wrapper>
    </Container>
  );
}
