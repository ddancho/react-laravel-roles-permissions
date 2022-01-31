import styled from "styled-components";
import { Form } from "./CreateTask.styled";
import { SuccessMsg } from "./CreateTask.styled";

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

export const AdminPanel = styled.div`
  background-color: white;
  border-radius: 8px;
  border: 1px solid #c2e7ba;
  padding: 20px 8px;
  width: 40%;

  & > h1 {
    color: #1877f2;
  }

  & > p {
    padding-bottom: 20px;
  }
`;

export const APForm = styled(Form)`
  height: 200px;

  & > div {
    margin-top: 20px;
  }

  & > div:last-child {
    margin-bottom: 20px;
  }
`;

export const ScsMsg = styled(SuccessMsg)`
  margin-left: 110px;
`;
