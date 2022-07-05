import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import OrderHeader from "../../components/admin/order/Header";
import PageTitle from "../../components/pageTitle";
import styled from "styled-components";
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
    }
  }
`;

const EDIT_NEW_ORDER_MUTATION = gql`
  mutation editNewOrder(
    $id: Int!
    $status: String!
    $addressName: String!
    $shippingName: String!
    $shippingPhone: String!
    $shippingAddress: String!
    $shippingDetailAddress: String!
    $shippingZipCode: String!
    $creditCard: String
    $expireDate: String
    $cvcNumber: String
  ) {
    editNewOrder(
      id: $id
      status: $status
      addressName: $addressName
      shippingName: $shippingName
      shippingPhone: $shippingPhone
      shippingAddress: $shippingAddress
      shippingDetailAddress: $shippingDetailAddress
      shippingZipCode: $shippingZipCode
      creditCard: $creditCard
      expireDate: $expireDate
      cvcNumber: $cvcNumber
    ) {
      ok
      error
    }
  }
`;

const CREATE_ORDER_ITEM_MUTATION = gql`
  mutation CreateOrderItem(
    $orderId: Int
    $productId: Int
    $amount: String
    $size: String
    $color: String
  ) {
    createOrderItem(
      orderId: $orderId
      productId: $productId
      amount: $amount
      size: $size
      color: $color
    ) {
      ok
      error
    }
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

const InfoBox = styled.div`
  width: 100%;
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
  align-items: center;
  height: 40px;
  padding: 30px 20px;
  border-bottom: 1px solid lightgray;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProductButtons = styled.span`
  margin-left: 20px;
  cursor: pointer;
`;

const ProductSelectBox = styled.div`
  margin: 0px 14px;
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

const StyledCheckBox = styled(Checkbox)`
  width: 20px;
  height: 20px;
`;

function NewOrder() {
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

    const zoneCodeInput = document.getElementById("zoneCodeInput");
    zoneCodeInput.value = data.zonecode;
    const shippingAddressInput = document.getElementById(
      "shippingAddressInput"
    );
    shippingAddressInput.value = fullAddress;
  };

  console.log(data);

  const addButton = () => {
    const productItem = document.getElementById("productItem");
    const productBox = document.getElementById("productBox");
    const copy = productItem.cloneNode(true);
    productBox.appendChild(copy);
  };

  const removeButton = () => {
    const productBox = document.getElementById("productBox");
    const productItem = document.getElementById("productItem");
    if (productBox.children.length > 1) {
      productBox.removeChild(productItem);
    }
  };

  const history = useHistory();

  const onCompleted = (data) => {
    const {
      editNewOrder: { ok, error },
    } = data;
    if (!ok) {
      return;
    } else {
      alert("저장이 완료되었습니다.");
    }
    history.push(routes.adminOrderNew);
    window.location.reload();
  };

  const onOrderItemCompleted = (data1) => {
    const {
      createOrderItem: { ok, error },
    } = data1;
    if (!ok) {
      return;
    }
  };

  const [editNewOrder, { loading }] = useMutation(EDIT_NEW_ORDER_MUTATION, {
    onCompleted,
  });

  const [createOrderItem, {}] = useMutation(CREATE_ORDER_ITEM_MUTATION, {
    onOrderItemCompleted,
  });

  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onBlur",
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    const size = document.getElementsByName("size");
    const amount = document.getElementsByName("amount");
    const color = document.getElementsByName("color");
    const productBox = document.getElementById("productBox");
    const productBoxLength = productBox.children.length;
    for (let i = 0; i < productBoxLength; i++) {
      data.size = size[i].value;
      data.amount = amount[i].value;
      data.color = color[i].value;
      data.productId = 1;
      data.orderId = parseInt(data.id);

      createOrderItem({
        variables: {
          ...data,
        },
      });
    }

    data.id = parseInt(data.id);
    data.status = "paid";
    editNewOrder({
      variables: {
        ...data,
      },
    });
  };

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
              <div>
                <ProductButtons onClick={addButton}>추가</ProductButtons>
                <ProductButtons onClick={removeButton}>제거</ProductButtons>
              </div>
            </ProductHeader>
          </InfoBox>
          <ShipBox id="productBox">
            <ProductItem id="productItem">
              <span>옵션</span>
              <HiddenBox>
                <span>상품ID</span>
                <StyledInput defaultValue="1"></StyledInput>
              </HiddenBox>
              <ProductSelectBox>
                <span>사이즈</span>
                <select
                  ref={register({ required: "사이즈 옵션을 선택해주세요" })}
                  name="size"
                  id="size"
                >
                  <option>36(230-235mm)</option>
                  <option>38(240-245mm)</option>
                  <option>40(250-255mm)</option>
                  <option>42(260-265mm)</option>
                  <option>44(270-275mm)</option>
                  <option>46(280-285mm)</option>
                  <option>48(290-295mm)</option>
                  <option>50(300-305mm)</option>
                  <option>52(310-315mm)</option>
                </select>
              </ProductSelectBox>
              <ProductSelectBox>
                <span>컬러</span>
                <select
                  ref={register({ required: "색상을 선택해주세요" })}
                  name="color"
                  id="color"
                >
                  <option>베이지</option>
                  <option>블랙</option>
                  <option>네이비</option>
                  <option>그레이</option>
                  <option>핑크</option>
                  <option>옐로우</option>
                  <option>화이트</option>
                </select>
              </ProductSelectBox>
              <ProductSelectBox>
                <span>수량</span>
                <select
                  ref={register({ required: "수량을 선택해주세요" })}
                  name="amount"
                  id="amount"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                </select>
              </ProductSelectBox>
            </ProductItem>
          </ShipBox>

          <InfoBox>
            <SubHeader>결제정보</SubHeader>
            <InputBox>
              <span>카드번호</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.creditCard || ""}
                ref={register({ required: "카드번호를 입력해주세요" })}
                name="creditCard"
                placeholder="카드번호 16자리 입력"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>유효기간(달/연)</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.expireDate || ""}
                ref={register({ required: "유효기간을 입력해주세요" })}
                name="expireDate"
                placeholder="Month/Year 4자리"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>cvc 넘버</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.cvcNumber || ""}
                ref={register({ required: "cvc넘버를 입력하세요" })}
                name="cvcNumber"
                placeholder="cvc넘버를 입력하세요"
              ></StyledInput>
            </InputBox>
          </InfoBox>
          <CompleteBox>
            <SaveBt defaultValue="주문완료" type="submit"></SaveBt>
          </CompleteBox>
        </FormContainer>
      </form>
    </div>
  );
}
export default NewOrder;
