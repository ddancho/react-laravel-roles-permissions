import { Container, Wrapper, Button, Paginate } from "./styles/Tasks.styled";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { ModelRoute, TaskActions } from "../components/IsAuthorized";
import { BeatLoader } from "react-spinners";
import Table from "../components/Table";
import api from "../helpers/api";

const IsAuthorized = lazy(() => import("../components/IsAuthorized"));

export default function Tasks() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const handleNewTask = () => {
    api()
      .get("/api/tasks/create")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tasks = useCallback(() => {
    api()
      .get(`/api/tasks?page=${currentPage}`)
      .then((res) => {
        setData(res.data.data);
        setCurrentPage(res.data.meta.current_page);
        setPageCount(res.data.meta.last_page);
        setPrevPage(parseLink(res.data.links.prev));
        setNextPage(parseLink(res.data.links.next));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentPage]);

  useEffect(() => {
    tasks();
  }, [tasks]);

  const parseLink = (link) => {
    if (link) {
      return link.split("page=")[1];
    }
    return link;
  };

  const onPageChange = (event) => {
    setCurrentPage(event.selected + 1);
  };

  const onClick = (event) => {
    if (event.isPrevious) {
      setCurrentPage(prevPage);
    }

    if (event.isNext) {
      setCurrentPage(nextPage);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Suspense fallback={<BeatLoader size={16} />}>
          <IsAuthorized model={ModelRoute.task} action={TaskActions.createTask}>
            <Button onClick={handleNewTask}>New Task</Button>
          </IsAuthorized>
        </Suspense>
        <Table data={data} />
        <Paginate
          breakLabel='...'
          nextLabel='next >'
          onPageChange={onPageChange}
          onClick={onClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel='< previous'
          renderOnZeroPageCount={null}
        />
      </Wrapper>
    </Container>
  );
}
