import styled from "styled-components";
import { Shadow } from "./Shadow.styled";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 360px;
  height: 340px;
  padding: 20px;
  padding-top: 30px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid #c2e7ba;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top-width: 0;
  ${Shadow}
`;

export const ErrWrapper = styled.div``;

export const ErrMsg = styled.span`
  align-self: flex-start;
  margin: 10px 0;
  color: red;
  font-size: 12px;

  & > p[id="logEmailErrors"] {
    visibility: ${(props) => props.showMsg};
  }

  & > p[id="logPasswordErrors"] {
    visibility: ${(props) => props.showMsg};
  }

  & > p[id="logServerErrors"] {
    visibility: ${(props) => props.showMsg};
  }
`;

export const LogInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const LogTitle = styled.h1`
  font-weight: 600;
  color: #42b72a;
  border-bottom: 1px solid green;
  margin-bottom: 5px;
  visibility: ${(props) => props.showMsg};
`;

export const LogMsg = styled.p`
  font-size: 12;
  font-weight: 20;
  visibility: ${(props) => props.showMsg};
`;
