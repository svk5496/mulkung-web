import styled from "styled-components";

const AuthSelect = styled.select`
  width: 100%;
  border-radius: 20px;
  padding: 9px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  option {
    background-color: ${(props) => props.theme.primary};
  }
`;

export default AuthSelect;
