import {
  Container,
  Wrapper,
  Task,
  Form,
  InputAction,
  Input,
  InputWrapper,
  TextArea,
  ErrMsg,
  SuccessMsg,
} from "./styles/CreateTask.styled";
import { Button } from "../components/styles/Button.styled";
import { SearchInput } from "../components/styles/SearchSuggestions.styled";
import SearchSuggestions from "../components/SearchSuggestions";
import { useEffect, useMemo, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import api from "../helpers/api";
import debounce from "lodash/debounce";

export default function CreateTask() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  const taskNameRef = useRef();
  const userNameRef = useRef();
  const dateTimeRef = useRef();
  const priorityRef = useRef();
  const descRef = useRef();

  const history = useHistory();

  useEffect(() => {
    api()
      .get("/api/tasks/isAuthorized/toStore")
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

    const task = {
      name: taskNameRef.current.value,
      userId: userId,
      dueDate: new Date(dateTimeRef.current.value),
      priority: parseInt(priorityRef.current.value),
      description: descRef.current.value,
    };

    api()
      .post("/api/tasks/create", task)
      .then((res) => {
        setErrors(null);
        setSuccess("Task successfully created !");
      })
      .catch((err) => {
        setErrors(err.response.data.errors);
        setSuccess(null);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Task>
          <h1>Create New Task</h1>
          <p>Access granted to Super Admin and Admin</p>
          <hr />
          <Form autoComplete='off' onSubmit={handleSubmit}>
            <InputAction>
              <InputWrapper>
                <Input type='text' placeholder='Task Name' ref={taskNameRef} />
                <span>
                  {errors?.name ? <ErrMsg show={errors.name.length > 0}>{errors.name[0]}</ErrMsg> : 0}
                </span>
              </InputWrapper>
              <InputWrapper>
                <SearchInput
                  type='text'
                  placeholder='User In Charge'
                  ref={userNameRef}
                  onChange={debouncedSearchHandler}
                />
                {users.length > 0 && (
                  <SearchSuggestions users={users} onClickSuggestion={handleClickSuggestion} top={274} />
                )}
                <span>
                  {errors?.userId ? <ErrMsg show={errors.userId.length > 0}>{errors.userId[0]}</ErrMsg> : 0}
                </span>
              </InputWrapper>
            </InputAction>
            <InputAction>
              <InputWrapper>
                <Input type='datetime-local' ref={dateTimeRef} />
                <span>
                  {errors?.dueDate ? (
                    <ErrMsg show={errors.dueDate.length > 0}>{errors.dueDate[0]}</ErrMsg>
                  ) : (
                    0
                  )}
                </span>
              </InputWrapper>
              <InputWrapper>
                <Input type='text' placeholder='Priority [1 - 5]' ref={priorityRef} />
                <span>
                  {errors?.priority ? (
                    <ErrMsg show={errors.priority.length > 0}>{errors.priority[0]}</ErrMsg>
                  ) : (
                    0
                  )}
                </span>
              </InputWrapper>
            </InputAction>
            <InputAction>
              <InputWrapper>
                <TextArea placeholder='Description' ref={descRef} rows={4}></TextArea>
                <span>
                  {errors?.description ? (
                    <ErrMsg show={errors.description.length > 0}>{errors.description[0]}</ErrMsg>
                  ) : (
                    0
                  )}
                </span>
              </InputWrapper>
            </InputAction>
            <InputAction>
              <Button type='submit'>Create</Button>
            </InputAction>
            <InputWrapper>
              <span>{success ? <SuccessMsg show={success !== null}>{success}</SuccessMsg> : 0}</span>
            </InputWrapper>
          </Form>
        </Task>
      </Wrapper>
    </Container>
  );
}
