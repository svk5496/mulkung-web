import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import AdminHeader from "./AdminHeader";

const Content = styled.main`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-width: 540px;
`;

const HiddenBlock = styled.div`
  width: 600px;
  height: 100px;
`;

function AdminLayout({ children }) {
  return (
    <>
      <div>
        <AdminHeader />
        <Content>{children}</Content>
      </div>
    </>
  );
}

export default AdminLayout;
