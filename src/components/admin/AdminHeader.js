import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faDoorOpen,
  faHeart,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar, logUserOut } from "../../apollo";
import useUser from "../../hooks/useUser";
import routes from "../../screens/routes";

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 38px;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.secondary};
  height: 60px;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-left: 12px;
  cursor: pointer;
  span {
    font-size: 20px;
    margin: 20px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function AdminHeader() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <HeaderContainer>
      <Wrapper>
        <MenuContainer>
          <Link to={routes.admin}>
            <Menu>
              <span>상점관리</span>
            </Menu>
          </Link>
          <Link to={routes.adminProduct}>
            <Menu>
              <span>상품관리</span>
            </Menu>
          </Link>
          <Link to={routes.adminOrder}>
            <Menu>
              <span>주문관리</span>
            </Menu>
          </Link>
          {isLoggedIn ? (
            <Link to={routes.admin}>
              <Menu>
                <FontAwesomeIcon icon={faDoorOpen} />
                <span onClick={() => logUserOut()}>로그아웃</span>
              </Menu>
            </Link>
          ) : (
            <Link to={routes.adminLogin}>
              <Menu>
                <FontAwesomeIcon icon={faDoorOpen} size="md" />
                <span>로그인</span>
              </Menu>
            </Link>
          )}
        </MenuContainer>
      </Wrapper>
    </HeaderContainer>
  );
}
export default AdminHeader;
