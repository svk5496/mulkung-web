import styled from "styled-components";

const SFormError = styled.span`
  width: 100%;
  height: 15px;
  color: white;
  margin: 5px 0px 5px 20px;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
