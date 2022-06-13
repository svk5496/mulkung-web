import styled from "styled-components";

const AuthButton = styled.input`
  border: none;
  border-radius: 3px;

  margin-top: 10px;
  background-color: ${(props) => props.theme.primary};
  color: black;
  text-align: center;
  padding: 14px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
`;

export default AuthButton;
