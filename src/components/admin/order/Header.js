import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faHeart,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import routes from "../../../screens/routes";

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: auto;
  border-bottom: 1px solid ${(props) => props.theme.secondary};
  background-color: ${(props) => props.theme.secondary};
  height: 40px;
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
    font-size: 14px;
    color: white;
    margin: 20px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function OrderHeader() {
  return (
    <HeaderContainer>
      <MenuContainer>
        <Link to={routes.adminOrderNew}>
          <Menu>
            <span>신규주문</span>
          </Menu>
        </Link>
        <Link to={routes.adminOrderPaid}>
          <Menu>
            <span>결제완료</span>
          </Menu>
        </Link>
        <Link to={routes.adminOrderSent}>
          <Menu>
            <span>배송완료</span>
          </Menu>
        </Link>
        <Link to={routes.adminOrderReturned}>
          <Menu>
            <span>반품접수</span>
          </Menu>
        </Link>
        <Link to={routes.adminOrderRefunded}>
          <Menu>
            <span>환불완료</span>
          </Menu>
        </Link>
      </MenuContainer>
    </HeaderContainer>
  );
}
export default OrderHeader;
