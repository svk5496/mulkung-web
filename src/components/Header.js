import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SHeader = styled.header`
  width: 100%;
  height: 90px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  flex-direction: column;
  top: 0;
  z-index: 10;
`;

const H1 = styled.span`
  font-size: ${(props) => props.theme.fs_subTitle3};
  font-weight: ${(props) => props.theme.fw_medium};
  color: white;
  padding: 3px 0px;
`;

const Logo = styled.div`
  height: 31px;
  width: 140px;
  margin: 2px 0px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const H2 = styled.span`
  font-size: ${(props) => props.theme.fs_body3};
  font-weight: ${(props) => props.theme.fw_medium};
  color: ${(props) => props.theme.bgColorDark};
  padding: 3px 0px;
`;

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CallBt = styled.span`
  background-color: ${(props) => props.theme.primary};
  padding: 6px 10px;
  margin-left: 6px;
  cursor: pointer;
  border-radius: 4px;
  font-weight: ${(props) => props.theme.fw_bold};
  font-size: ${(props) => props.theme.fs_body5};
`;

function Header() {
  function handleClick() {
    document.location.href = "tel:1688-3596";
  }
  return (
    <SHeader>
      <Logo>
        <img src="https://gi.esmplus.com/kishop1121/web/shared/logo_long.png"></img>
      </Logo>
      <H2>족저근막염 달고 사시는 분 잠시만요!</H2>
      <PhoneContainer>
        <H1>대표전화 1688 - 3596</H1>
        <CallBt onClick={handleClick}>전화하기</CallBt>
      </PhoneContainer>
    </SHeader>
  );
}
export default Header;
