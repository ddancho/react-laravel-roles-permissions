import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../helpers/api";

export default function IsAuthorized({ children, componentAction }) {
  const [show, setShow] = useState(false);
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    api()
      .get(`/api/tasks/isAuthorized/${componentAction}`)
      .then((res) => {
        setShow(true);
      })
      .catch((err) => {
        setShow(false);
      });
  }, [componentAction, user]);

  return <>{show && children}</>;
}

export const TaskActions = {
  createTask: "toStore",
  updateTask: "toUpdate",
  deleteTask: "toDestroy",
};
