import styled from "styled-components";

export const InputAction = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 18px;
  padding-left: 20px;

  &:focus {
    outline: none;
  }
`;
