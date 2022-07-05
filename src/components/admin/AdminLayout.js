import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import AdminHeader from "./AdminHeader";

const AdminContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    110.62deg,
    #dff4c3 11.14%,
    #a5e357 38.53%,
    #aed57d 59.81%,
    #6bbc9c 91.41%
  );
`;

const AdminBox = styled.div`
  width: 98%;
  height: 95%;
  background-color: ${(props) => props.theme.bgGrayLight};
  display: flex;
  border-radius: 20px;
  overflow: hidden;
`;

const HeaderArea = styled.div`
  width: 14%;
  min-width: 200px;
  box-shadow: 5px 6px 30px rgba(211, 227, 67, 0.4);
`;

const ContentArea = styled.div`
  width: 86%;
  overflow: scroll;
`;

const Content = styled.main`
  width: 100%;
  height: 100%;
`;

function AdminLayout({ children }) {
  return (
    <>
      <AdminContainer>
        <AdminBox>
          <HeaderArea>
            <AdminHeader />
          </HeaderArea>
          <ContentArea>
            <Content>{children}</Content>
          </ContentArea>
        </AdminBox>
      </AdminContainer>
    </>
  );
}

export default AdminLayout;
