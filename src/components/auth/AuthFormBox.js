import styled from "styled-components";
import { WhiteBox } from "../shared";

const Container = styled.div`
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  justify-content: center;
  border-radius: 20px;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 25px 40px;
  margin-bottom: 10px;
  margin-top: 10px;
  form {
    margin-top: 4px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

function AuthFormBox({ children }) {
  return <Container>{children}</Container>;
}
export default AuthFormBox;
