import styled from "styled-components";
import { Shadow } from "./Shadow.styled";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-left: 4px;
`;

export const Task = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #c2e7ba;
  padding: 10px 4px;
  width: 50%;
  padding-left: 20px;

  & > h1 {
    color: #1877f2;
  }

  & > p {
    padding-bottom: 20px;
  }
`;

export const TaskName = styled.h2`
  padding-top: 20px;
`;

export const TaskDescription = styled.p`
  padding: 20px 0;
`;

export const TaskStatus = styled.input``;

export const TaskForm = styled.form`
  display: flex;
  align-items: flex-start;
  padding: 10px 10px;
  width: 240px;
  border-radius: 10px;
  border: 1px solid #c2e7ba;
  ${Shadow}

  & > div {
    span {
      font-size: 18px;
      margin-left: 10px;
    }
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 4px 6px;
  border-radius: 8px;
  border: none;
  background-color: #42b72a;
  color: white;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

export const TaskFormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const Message = styled.p`
  margin-left: 10px;
  color: ${({ success }) => (success ? "green" : "red")};
`;
