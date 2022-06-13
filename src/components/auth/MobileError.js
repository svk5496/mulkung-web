import styled from "styled-components";

const SFormError = styled.span`
  width: 100%;
  font-size: 8px;
  height: 10px;
  color: white;
  margin: 5px 0px 5px 20px;
`;

function MobileError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default MobileError;
