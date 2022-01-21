import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 80px auto auto;
  width: 70%;
`;

export const Button = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 10px;
  border: none;
  background-color: #42b72a;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const Paginate = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  list-style-type: none;

  li a {
    border-radius: 8px;
    padding: 4px 6px;
    margin: 0 10px;
    border: 1px solid lightgray;
    cursor: pointer;
  }

  li.previous a,
  li.next a,
  li.break a {
    border-color: transparent;
  }

  li.active a {
    color: white;
    background-color: #1877f2;
    border-color: darkgray;
  }

  li.disabled a {
    color: grey;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
