import styled from "styled-components";

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

export const ButtonAction = styled.div``;

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
`;

export const TableHeader = styled.th`
  width: 100%;
  text-align: left;
  font-weight: bold;
  font-size: 18px;
  padding: 8px 4px;
  background-color: white;
`;

export const TableData = styled.td`
  width: 100%;
  text-align: left;
  font-weight: 300;
  font-size: 14px;
  padding: 8px 4px;
  color: darkslategrey;
  background-color: #ece3e3;

  &:nth-child(n) {
    border-right: 1px solid chocolate;
  }

  &:last-child {
    border-right: none;
  }
`;
