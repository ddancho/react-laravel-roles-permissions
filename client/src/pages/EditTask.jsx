import {
  Container,
  Wrapper,
  Task,
  TaskName,
  TaskDescription,
  TaskForm,
  TaskFormContainer,
  Button,
  Message,
} from "./styles/EditTask.styled";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../helpers/api";

export default function EditTask() {
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState(false);
  const [msg, SetMsg] = useState("");
  const [showMsg, SetShowMsg] = useState({ show: false });
  const { id } = useParams();
  const history = useHistory();

  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    let url = `/api/tasks/${id}`;
    SetShowMsg({ show: false });

    api()
      .get(url)
      .then((res) => {
        setTask(res.data.task);
        setStatus(res.data.task.status === 1 ? true : false);
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          setTask(null);
          setStatus(false);
          history.push("/");
        }
      });
  }, [id, history]);

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    const updateInfo = {
      status: status ? 1 : 0,
    };

    api()
      .post(`/api/tasks/${id}/update`, updateInfo)
      .then((res) => {
        SetMsg(`Status of the task ${task.name} successfully updated by ${user.name} (${user.role})`);
        SetShowMsg({ show: true, success: true });
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setTask(null);
          setStatus(false);
          history.push("/");
        }
        SetMsg("Something went wrong. Please try later");
        SetShowMsg({ show: true, success: false });
      });
  };

  return (
    <>
      {task && (
        <Container>
          <Wrapper>
            <Task>
              <h1>Edit Task Status</h1>
              <p>Access granted to Super Admin, Admin and User in charge of the task</p>
              <hr />
              <TaskName>
                {task.name} - {task.in_charge.name}
              </TaskName>
              <TaskDescription>{task.description}</TaskDescription>
              <TaskFormContainer>
                <TaskForm onSubmit={handleTaskSubmit}>
                  <div>
                    <input type='checkbox' checked={status} onChange={(e) => setStatus(e.target.checked)} />
                    <span>
                      Status : <b>{status ? "Finished" : "Not Finished"}</b>
                    </span>
                    <Button type='submit'>Submit</Button>
                  </div>
                </TaskForm>
                {showMsg.show && <Message success={showMsg.success}>{msg}</Message>}
              </TaskFormContainer>
            </Task>
          </Wrapper>
        </Container>
      )}
    </>
  );
}
