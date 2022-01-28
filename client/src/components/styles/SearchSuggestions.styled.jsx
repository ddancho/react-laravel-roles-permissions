import styled from "styled-components";
import { Input } from "../../pages/styles/CreateTask.styled";

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
`;

export const SearchInput = styled(Input)`
  position: relative;
  width: 100%;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 278px;
  width: 270px;
  background: white;
  border-radius: 10px;
  border: 1px solid #979797;
`;

export const List = styled.ul`
  list-style: none;
`;

export const Item = styled.li`
  font-size: 14px;
  margin: 6px 8px;
  padding-left: 6px;
  padding-top: 4px;
  padding-bottom: 4px;
  color: black;
  border-bottom: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    color: white;
    border-radius: 4px;
    background-color: #1877f2;
  }

  &:last-child {
    border-bottom: none;
  }
`;
