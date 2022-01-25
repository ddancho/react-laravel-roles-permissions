import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../helpers/api";

export default function IsAuthorized({ children, model, action, id = null }) {
  const [show, setShow] = useState(false);
  const { userInfo: user } = useSelector((state) => state.user);

  useEffect(() => {
    let url = `/api/${model}/isAuthorized/${action}`;

    if (id) {
      url = url.concat(`/${id}`);
    }

    api()
      .get(url)
      .then((res) => {
        setShow(true);
      })
      .catch((err) => {
        setShow(false);
      });
  }, [model, action, user, id]);

  return <>{show ? children : ""}</>;
}
