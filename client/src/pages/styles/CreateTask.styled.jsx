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
  height: 440px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #c2e7ba;
  margin: 20px auto;
  ${Shadow}
`;

export const InputAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 110px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin: 0 10px;

  & > span {
    font-size: 12px;
    margin-top: 6px;
    visibility: hidden;
  }
`;

export const Input = styled.input`
  height: 46px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;

  &:focus {
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 16px;
  padding: 10px 10px;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const ErrMsg = styled.p`
  color: red;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

export const SuccessMsg = styled.p`
  margin-left: 240px;
  font-size: 12px;
  color: green;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;
