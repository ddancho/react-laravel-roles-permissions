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
  padding: 20px 8px;
  width: 50%;

  & > h1 {
    color: #1877f2;
  }

  & > p {
    padding-bottom: 20px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 400px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #c2e7ba;
  margin: 20px auto;
  ${Shadow}
`;

export const InputAction = styled.div`
  display: flex;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;
  margin: 20px 10px;

  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  margin: 20px 10px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 16px;
  padding-top: 10px;
  padding-left: 20px;
  resize: none;

  &:focus {
    outline: none;
  }
`;
