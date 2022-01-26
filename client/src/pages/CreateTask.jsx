import { Container, Wrapper, Task, Form, InputAction, Input, TextArea } from "./styles/CreateTask.styled";
import { ButtonAction, Button } from "../components/styles/Button.styled";
import { SearchWrapper, SearchInput } from "../components/styles/SearchSuggestions.styled";
import SearchSuggestions from "../components/SearchSuggestions";
import { useEffect, useMemo, useState, useRef } from "react";
import api from "../helpers/api";
import debounce from "lodash/debounce";

export default function CreateTask() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);

  const taskNameRef = useRef();
  const userNameRef = useRef();
  const dateTimeRef = useRef();
  const priorityRef = useRef();
  const descRef = useRef();

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
    console.log("date time :", dateTimeRef.current.value);

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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
              <Input type='text' placeholder='Task Name' ref={taskNameRef} required />
              <SearchWrapper>
                <SearchInput
                  type='text'
                  placeholder='User In Charge'
                  ref={userNameRef}
                  onChange={debouncedSearchHandler}
                  required
                />
                {users.length > 0 && (
                  <SearchSuggestions users={users} onClickSuggestion={handleClickSuggestion} />
                )}
              </SearchWrapper>
            </InputAction>
            <InputAction>
              <Input type='datetime-local' ref={dateTimeRef} required />
              <Input type='text' placeholder='Priority [1 - 5]' ref={priorityRef} required />
            </InputAction>
            <InputAction>
              <TextArea placeholder='Description' ref={descRef}></TextArea>
            </InputAction>
            <ButtonAction>
              <Button type='submit'>Create</Button>
            </ButtonAction>
          </Form>
        </Task>
      </Wrapper>
    </Container>
  );
}
