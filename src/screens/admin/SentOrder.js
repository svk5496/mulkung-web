import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import OrderHeader from "../../components/admin/order/Header";
import PageTitle from "../../components/pageTitle";
import styled from "styled-components";
import CryptoJS from "crypto-js";

import {
  Checkbox,
  FlexBox,
  HiddenBox,
  HiddenInput,
  StyledInput,
  SubHeader,
} from "../../components/shared";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useHistory } from "react-router-dom";
import routes from "../routes";

const SEE_ORDER_DETAIL_QUERY = gql`
  query SeeOrderDetail($id: Int!) {
    seeOrderDetail(id: $id) {
      id
      orderMethod
      status
      o_name
      o_phone
      o_address
      o_detailAddress
      o_zipCode
      user {
        id
        firstName
        phone
        age
        creditCard
        expireDate
        cvcNumber
        d_zipCode
        d_address
        d_detailAddress
        shippingAddresses {
          addressName
          shippingName
          shippingPhone
          shippingAddress
          shippingDetailAddress
          shippingZipCode
        }
      }
      orderItems {
        id
        color
        size
        amount
        status
        trackingNumber
      }
    }
  }
`;

const EDIT_PAID_ORDER_MUTATION = gql`
  mutation editPaidOrder(
    $id: Int!
    $status: String!
    $addressName: String!
    $shippingName: String!
    $shippingPhone: String!
    $shippingAddress: String!
    $shippingDetailAddress: String!
    $shippingZipCode: String!
  ) {
    editPaidOrder(
      id: $id
      status: $status
      addressName: $addressName
      shippingName: $shippingName
      shippingPhone: $shippingPhone
      shippingAddress: $shippingAddress
      shippingDetailAddress: $shippingDetailAddress
      shippingZipCode: $shippingZipCode
    ) {
      ok
      error
    }
  }
`;

const EDIT_ORDER_ITEM_MUTATION = gql`
  mutation EditOrderItem(
    $orderItemId: Int!
    $trackingNumber: String
    $orderItemStatus: String
    $memo: String
  ) {
    editOrderItem(
      orderItemId: $orderItemId
      trackingNumber: $trackingNumber
      orderItemStatus: $orderItemStatus
      memo: $memo
    ) {
      ok
      error
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const InfoBox = styled.div`
  width: 40%;
  border-radius: 5px;
  padding: 20px 20px;
`;

const ShipBox = styled(InfoBox)`
  padding: 0px 0px;
`;

const InputBox = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
`;

const ShipInput = styled(StyledInput)`
  width: 70%;
`;

const ProductItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 30px 20px;
  border-bottom: 1px solid lightgray;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TrackingText = styled.div`
  width: 100px;
`;

const ProductSelectBox = styled.div`
  margin: 10px 14px;
`;

const CompleteBox = styled.div`
  width: 35%;
  margin-top: 50px;
  margin-bottom: 80px;
  display: flex;
  justify-content: end;
`;

const SaveBt = styled.input`
  padding: 20px 40px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.primary};
  cursor: pointer;
`;

const PostBox = styled.div`
  margin: 10px 0px;
`;

const SearchBt = styled.span`
  padding: 10px 20px;
  border: solid 1px ${(props) => props.theme.borderColor};
  cursor: pointer;
  margin-right: 2px;
`;

function SentOrder() {
  const { id } = useParams();

  const { _, data } = useQuery(SEE_ORDER_DETAIL_QUERY, {
    variables: {
      id: parseInt(id),
    },
  });

  const [visible, setVisible] = useState(false);

  const searchBt = () => {
    setVisible(!visible);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setVisible(!visible);

    //console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    const zoneCodeInput = document.getElementById("zoneCodeInput");
    zoneCodeInput.value = data.zonecode;
    const shippingAddressInput = document.getElementById(
      "shippingAddressInput"
    );
    shippingAddressInput.value = fullAddress;
  };

  const history = useHistory();

  const onCompleted = (data) => {
    console.log(data);
    const {
      editPaidOrder: { ok, error },
    } = data;
    if (!ok) {
      return;
    } else {
      alert("저장 성공!");
    }
    history.push(routes.adminOrderPaid);
    window.location.reload();
  };

  const onOrderItemCompleted = (data1) => {
    console.log(data1);
    const {
      createOrderItem: { ok, error },
    } = data1;
    if (!ok) {
      return;
    }
  };

  const [editPaidOrder, { loading }] = useMutation(EDIT_PAID_ORDER_MUTATION, {
    onCompleted,
  });

  const [editOrderItem, {}] = useMutation(EDIT_ORDER_ITEM_MUTATION, {
    onOrderItemCompleted,
  });

  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onBlur",
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    console.log(data);
    const trackingNumber = document.getElementsByName("trackingNumber");
    const orderItemId = document.getElementsByName("orderItemId");
    const orderItemStatus = document.getElementsByName("orderItemStatus");
    const memo = document.getElementsByName("memo");
    const productBox = document.getElementById("productBox");
    const productBoxLength = productBox.children.length;
    for (let i = 0; i < productBoxLength; i++) {
      data.orderItemId = parseInt(orderItemId[i].value);
      data.trackingNumber = trackingNumber[i].value;
      data.orderItemStatus = orderItemStatus[i].value;
      data.memo = memo[i].value;

      editOrderItem({
        variables: {
          ...data,
        },
      });
      console.log(data);
    }
    data.id = parseInt(data.id);

    data.status = "returned";
    editPaidOrder({
      variables: {
        ...data,
      },
    });
  };

  console.log(data);
  let creditCard = "";
  let cvcNumber = "";

  if (data) {
    const key = process.env.REACT_APP_CRYPTO_JS_KEY;
    const iv = process.env.REACT_APP_CRYPTO_JS_SALT;

    const keyutf = CryptoJS.enc.Utf8.parse(key);
    const ivutf = CryptoJS.enc.Utf8.parse(iv);

    const decCreditCard = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(
          data?.seeOrderDetail?.user?.creditCard
        ),
      },
      keyutf,
      { iv: ivutf }
    );

    const decCvcNumber = CryptoJS.AES.decrypt(
      {
        ciphertext: CryptoJS.enc.Base64.parse(
          data?.seeOrderDetail?.user?.cvcNumber
        ),
      },
      keyutf,
      { iv: ivutf }
    );

    creditCard = CryptoJS.enc.Utf8.stringify(decCreditCard);
    cvcNumber = CryptoJS.enc.Utf8.stringify(decCvcNumber);
  }

  return (
    <div>
      <PageTitle title="주문관리"></PageTitle>
      <OrderHeader></OrderHeader>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <FormContainer>
          <HiddenInput
            value={parseInt(data?.seeOrderDetail?.id) || ""}
            readOnly
            ref={register()}
            name="id"
            type="text"
            placeholder="이름"
          ></HiddenInput>
          <InfoBox>
            <SubHeader>개인정보</SubHeader>
            <InputBox>
              <span>이름</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.firstName || ""}
                ref={register({ required: "이름을 입력해주세요" })}
                name="firstName"
                type="text"
                placeholder="이름"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>번호</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.phone || ""}
                ref={register({ required: "번호를 입력해주세요" })}
                name="phone"
                type="text"
                placeholder="번호"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>나이</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.age || ""}
                ref={register({ required: "나이를 입력해주세요" })}
                name="age"
                type="text"
                placeholder="나이"
              ></StyledInput>
            </InputBox>
          </InfoBox>
          <InfoBox>
            <SubHeader>배송정보</SubHeader>
            <InputBox>
              <span>배송지 이름 ( 예: 집, 사무실, 친구집 등 )</span>
              <StyledInput
                defaultValue="집"
                placeholder="( 예: 집, 사무실, 친구집 등 )"
                ref={register({ required: "배송지 별명을 입력" })}
                name="addressName"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>배송 받으시는 분 이름</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.firstName || ""}
                placeholder="받는 사람 이름"
                ref={register({ required: "이름을 입력" })}
                name="shippingName"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>배송 받은시는 분 번호</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.phone || ""}
                placeholder="받는 사람 번호"
                ref={register({ required: "전화번호를 입력" })}
                name="shippingPhone"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>배송지</span>
              <FlexBox>
                <ShipInput
                  defaultValue={data?.seeOrderDetail?.user?.d_zipCode || ""}
                  readOnly
                  ref={register({ required: "우편번호를 입력해주세요" })}
                  name="shippingZipCode"
                  placeholder="우편번호"
                  id="zoneCodeInput"
                ></ShipInput>
                <SearchBt onClick={searchBt}>우편번호 검색</SearchBt>
              </FlexBox>
            </InputBox>
            {visible ? (
              <PostBox>
                <DaumPostcode onComplete={handleComplete} />
              </PostBox>
            ) : null}

            <InputBox>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.d_address || ""}
                readOnly
                ref={register({ required: "주소를 입력해주세요" })}
                name="shippingAddress"
                placeholder="집주소입력"
                id="shippingAddressInput"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.d_detailAddress || ""}
                ref={register({ required: "나머지 주소 입력" })}
                name="shippingDetailAddress"
                placeholder="나머지 주소 입력"
              ></StyledInput>
            </InputBox>
          </InfoBox>
          <InfoBox>
            <ProductHeader>
              <SubHeader>주문상품</SubHeader>
            </ProductHeader>
          </InfoBox>
          <ShipBox id="productBox">
            {data?.seeOrderDetail.orderItems.map((orderItem) => (
              <ProductItem key={orderItem.id}>
                <FlexBox>
                  <HiddenInput
                    value={parseInt(orderItem.id) || ""}
                    readOnly
                    ref={register()}
                    name="orderItemId"
                  ></HiddenInput>
                  <TrackingText>
                    <span>옵션</span>
                  </TrackingText>
                  <HiddenBox>
                    <span>상품ID</span>
                    <StyledInput defaultValue="1"></StyledInput>
                  </HiddenBox>
                  <span>사이즈 :</span>

                  <ProductSelectBox>
                    <span>{orderItem.size}</span>
                  </ProductSelectBox>
                  <ProductSelectBox>
                    <span>컬러 :</span>
                    <span>{orderItem.color}</span>
                  </ProductSelectBox>
                  <ProductSelectBox>
                    <span>수량 :</span>
                    <span>{orderItem.amount}</span>
                  </ProductSelectBox>
                </FlexBox>
                <FlexBox>
                  <TrackingText>
                    <span>송장번호</span>
                  </TrackingText>
                  <StyledInput
                    defaultValue={orderItem.trackingNumber || ""}
                    ref={register({ required: "송장번호 입력해주세요" })}
                    name="trackingNumber"
                    placeholder="송장번호번호 16자리 입력"
                  ></StyledInput>
                </FlexBox>
                <ProductSelectBox>
                  <select
                    ref={register({ required: "배송상태를 선택해주세요" })}
                    name="orderItemStatus"
                    id="orderItemStatus"
                  >
                    <option>배송완료</option>
                    <option>환불접수</option>
                    <option>교환접수</option>
                  </select>
                </ProductSelectBox>
                <FlexBox>
                  <StyledInput
                    ref={register()}
                    name="memo"
                    placeholder="필요시 메모 작성(예: 교환신청 사이즈 36 --> 38, 핑크)"
                  ></StyledInput>
                </FlexBox>
              </ProductItem>
            ))}
          </ShipBox>

          <InfoBox>
            <SubHeader>결제정보</SubHeader>
            <InputBox>
              <span>카드번호</span>
              <StyledInput
                defaultValue={creditCard || ""}
                name="creditCard"
                placeholder="카드번호 16자리 입력"
                readOnly
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>유효기간(달/연)</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.expireDate || ""}
                name="expireDate"
                placeholder="Month/Year 4자리"
                readOnly
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>cvc 넘버</span>
              <StyledInput
                defaultValue={cvcNumber || ""}
                name="cvcNumber"
                placeholder="cvc넘버를 입력하세요"
                readOnly
              ></StyledInput>
            </InputBox>
          </InfoBox>
          <CompleteBox>
            <SaveBt value="반품신청" type="submit"></SaveBt>
          </CompleteBox>
        </FormContainer>
      </form>
    </div>
  );
}
export default SentOrder;
