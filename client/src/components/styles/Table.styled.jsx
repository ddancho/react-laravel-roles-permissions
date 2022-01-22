import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TableContainer = styled.table`
  margin-top: 10px;
`;

export const TableRow = styled.tr`
  display: flex;
  justify-content: space-evenly;
  border: ${({ header }) => (header ? "none" : "1px solid chocolate")};

  &:nth-child(1n + 2) {
    border-top: none;
  }

  & > th {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
  }

  & > td {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
  }
`;

export const TableHeader = styled.th`
  font-weight: bold;
  font-size: 18px;
  background-color: white;
`;

export const TableData = styled.td`
  padding-left: 10px;
  font-weight: 300;
  font-size: 16px;
  color: darkslategrey;
  background-color: #f6f6f6;

  &:nth-child(n) {
    border-right: 1px solid chocolate;
  }

  &:last-child {
    border-right: none;
  }
`;

export const Priority = styled.div`
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  margin-right: 10px;
`;

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Action = styled.button`
  width: 48px;
  padding: 2px 6px;
  border-radius: 8px;
  border: none;
  background-color: #42b72a;
  color: white;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;
