import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  position: sticky;
  align-items: center;
  justify-content: space-between;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 15px 20px;
  background-color: #1877f2;
`;

export const Left = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
`;

export const Logo = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LinkAction = styled.div`
  margin-right: 20px;

  & > a {
    font-size: 16px;
    text-decoration: none;
    font-weight: ${({ current }) => (current === true ? "bold" : "normal")};
    color: ${({ current }) => (current === true ? "darkblue" : "white")};
  }
`;

export const Logout = styled.button`
  font-size: 16px;
  color: white;
  background-color: #1877f2;
  border: none;
  margin-right: 20px;
  cursor: pointer;
`;

export const User = styled.span`
  font-size: 16px;
  color: darkblue;
  margin-right: 20px;
`;
