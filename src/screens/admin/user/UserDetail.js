import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { StyledInput } from "../../../components/shared";
import CryptoJS from "crypto-js";

const Base = styled.div`
  padding-left: 40px;
  width: 100%;
  height: 100%;
`;

const InfoBox = styled.div`
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
`;

const InfoTitle = styled.span`
  font-size: 20px;
  padding: 40px 0px 10px 0px;
`;

const StyledBox = styled.div`
  width: 100%;
  padding: 5px 0px;
`;

const StyledTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const SEE_USER_DETAIL_QUERY = gql`
  query seeUser($id: Int!) {
    seeUser(id: $id) {
      firstName
      lastName
      username
      email
      password
      phone
      size
      age
      gender
      expireDate
      creditCard
      cvcNumber
      d_address
      d_detailAddress
      d_zipCode
      totalPurchase
      order {
        status
        orderMethod
      }
    }
  }
`;

function UserDetail() {
  const { id } = useParams();
  const { _, data, loading } = useQuery(SEE_USER_DETAIL_QUERY, {
    variables: {
      id: parseInt(id),
    },
  });
  let creditCard = "";
  let cvcNumber = "";

  if (data) {
    const key = process.env.REACT_APP_CRYPTO_JS_KEY;
    const iv = process.env.REACT_APP_CRYPTO_JS_SALT;

    const keyutf = CryptoJS.enc.Utf8.parse(key);
    const ivutf = CryptoJS.enc.Utf8.parse(iv);

    const decCreditCard = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(data?.seeUser?.creditCard || ""),
      },
      keyutf,
      { iv: ivutf }
    );

    const decCvcNumber = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(data?.seeUser?.cvcNumber || ""),
      },
      keyutf,
      { iv: ivutf }
    );

    creditCard = CryptoJS.enc.Utf8.stringify(decCreditCard);
    cvcNumber = CryptoJS.enc.Utf8.stringify(decCvcNumber);
  }
  if (data) {
    console.log(data);
  }
  return (
    <Base>
      <InfoBox>
        <InfoTitle>개인정보</InfoTitle>
        <StyledBox>
          <StyledTitle>이름</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.firstName || ""}
          ></StyledInput>
        </StyledBox>
        <StyledBox>
          <StyledTitle>나이</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.age || ""}
          ></StyledInput>
        </StyledBox>
        <StyledBox>
          <StyledTitle>성별</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.gender || ""}
          ></StyledInput>
        </StyledBox>
        <StyledBox>
          <StyledTitle>번호</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.phone || ""}
          ></StyledInput>
        </StyledBox>

        <StyledBox>
          <StyledTitle>카드번호</StyledTitle>
          <StyledInput readOnly defaultValue={creditCard || ""}></StyledInput>
        </StyledBox>
        <StyledBox>
          <StyledTitle>cvc</StyledTitle>
          <StyledInput readOnly defaultValue={cvcNumber || ""}></StyledInput>
        </StyledBox>
        <StyledBox>
          <StyledTitle>만료일자</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.expireDate || ""}
          ></StyledInput>
        </StyledBox>
      </InfoBox>
      <InfoBox>
        <InfoTitle>결제정보</InfoTitle>
        <StyledBox>
          <StyledTitle>총 구매횟수</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.totalPurchase || ""}
          ></StyledInput>
        </StyledBox>
      </InfoBox>
      <InfoBox>
        <InfoTitle>배송정보</InfoTitle>
        <StyledBox>
          <StyledTitle>주소</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.d_address || ""}
          ></StyledInput>
        </StyledBox>
        <StyledBox>
          <StyledTitle>상세주소</StyledTitle>
          <StyledInput
            readOnly
            defaultValue={data?.seeUser?.d_detailAddress || ""}
          ></StyledInput>
        </StyledBox>
      </InfoBox>
    </Base>
  );
}
export default UserDetail;
