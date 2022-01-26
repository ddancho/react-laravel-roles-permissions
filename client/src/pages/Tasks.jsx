import { Container, Wrapper, Button, Paginate } from "./styles/Tasks.styled";
import { useState, useEffect, useCallback } from "react";
import { ModelRoutes } from "../helpers/modelRoutes";
import { TaskActions } from "../helpers/modelActions";
import { Link } from "react-router-dom";
import IsAuthorized from "../components/IsAuthorized";
import Table from "../components/Table";
import api from "../helpers/api";

export default function Tasks() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [pageCount, setPageCount] = useState(0);

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
        <IsAuthorized model={ModelRoutes.task} action={TaskActions.createTask}>
          <Link to='/tasks/create'>
            <Button>New Task</Button>
          </Link>
        </IsAuthorized>
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
