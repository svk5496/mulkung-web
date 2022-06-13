import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

import Header from "./Header";

const MobileContent = styled.main`
  margin-top: 90px;
  max-width: 540px;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1500px;
  min-width: 540px;
`;

const Content = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  min-width: 540px;
`;

const HiddenBlock = styled.div`
  width: 600px;
  height: 100px;
`;

function Layout({ children }) {
  const isMobile = useMediaQuery({
    query: "(max-width:540px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width:1100px)",
  });

  return (
    <>
      {isMobile ? (
        <div>
          <Header />
          <MobileContent>{children}</MobileContent>
        </div>
      ) : (
        <ContentContainer>
          <Content>{children}</Content>
          {isTablet ? null : <HiddenBlock></HiddenBlock>}
        </ContentContainer>
      )}
    </>
  );
}

export default Layout;
