import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import OrderHeader from "../../../components/admin/order/Header";
import PageTitle from "../../../components/pageTitle";
import styled from "styled-components";
import CryptoJS from "crypto-js";

import {
  Checkbox,
  FlexBox,
  HiddenBox,
  HiddenInput,
  StyledInput,
  SubHeader,
} from "../../../components/shared";
import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useHistory } from "react-router-dom";
import routes from "../../routes";

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
        memo
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

function ReturnedOrder() {
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

  const history = useHistory();

  const onCompleted = (data) => {
    const {
      editPaidOrder: { ok, error },
    } = data;
    if (!ok) {
      return;
    } else {
      alert("?????? ??????!");
    }
    history.push(routes.adminOrderPaid);
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

    data.id = parseInt(data.id);

    data.status = "refunded";
    editPaidOrder({
      variables: {
        ...data,
      },
    });
  };

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
      <PageTitle title="????????????"></PageTitle>
      <OrderHeader></OrderHeader>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <FormContainer>
          <HiddenInput
            value={parseInt(data?.seeOrderDetail?.id) || ""}
            readOnly
            ref={register()}
            name="id"
            type="text"
            placeholder="??????"
          ></HiddenInput>
          <InfoBox>
            <SubHeader>????????????</SubHeader>
            <InputBox>
              <span>??????</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.firstName || ""}
                ref={register({ required: "????????? ??????????????????" })}
                name="firstName"
                type="text"
                placeholder="??????"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>??????</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.phone || ""}
                ref={register({ required: "????????? ??????????????????" })}
                name="phone"
                type="text"
                placeholder="??????"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>??????</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.age || ""}
                ref={register({ required: "????????? ??????????????????" })}
                name="age"
                type="text"
                placeholder="??????"
              ></StyledInput>
            </InputBox>
          </InfoBox>
          <InfoBox>
            <SubHeader>????????????</SubHeader>
            <InputBox>
              <span>????????? ?????? ( ???: ???, ?????????, ????????? ??? )</span>
              <StyledInput
                defaultValue="???"
                placeholder="( ???: ???, ?????????, ????????? ??? )"
                ref={register({ required: "????????? ????????? ??????" })}
                name="addressName"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>?????? ???????????? ??? ??????</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.firstName || ""}
                placeholder="?????? ?????? ??????"
                ref={register({ required: "????????? ??????" })}
                name="shippingName"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>?????? ???????????? ??? ??????</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.phone || ""}
                placeholder="?????? ?????? ??????"
                ref={register({ required: "??????????????? ??????" })}
                name="shippingPhone"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>?????????</span>
              <FlexBox>
                <ShipInput
                  defaultValue={data?.seeOrderDetail?.user?.d_zipCode || ""}
                  readOnly
                  ref={register({ required: "??????????????? ??????????????????" })}
                  name="shippingZipCode"
                  placeholder="????????????"
                  id="zoneCodeInput"
                ></ShipInput>
                <SearchBt onClick={searchBt}>???????????? ??????</SearchBt>
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
                ref={register({ required: "????????? ??????????????????" })}
                name="shippingAddress"
                placeholder="???????????????"
                id="shippingAddressInput"
              ></StyledInput>
            </InputBox>
            <InputBox>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.d_detailAddress || ""}
                ref={register({ required: "????????? ?????? ??????" })}
                name="shippingDetailAddress"
                placeholder="????????? ?????? ??????"
              ></StyledInput>
            </InputBox>
          </InfoBox>
          <InfoBox>
            <ProductHeader>
              <SubHeader>????????????</SubHeader>
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
                    <span>??????</span>
                  </TrackingText>
                  <HiddenBox>
                    <span>??????ID</span>
                    <StyledInput defaultValue="1"></StyledInput>
                  </HiddenBox>
                  <span>????????? :</span>

                  <ProductSelectBox>
                    <span>{orderItem.size}</span>
                  </ProductSelectBox>
                  <ProductSelectBox>
                    <span>?????? :</span>
                    <span>{orderItem.color}</span>
                  </ProductSelectBox>
                  <ProductSelectBox>
                    <span>?????? :</span>
                    <span>{orderItem.amount}</span>
                  </ProductSelectBox>
                </FlexBox>
                <FlexBox>
                  <TrackingText>
                    <span>????????????</span>
                  </TrackingText>
                  <StyledInput
                    defaultValue={orderItem.trackingNumber || ""}
                    ref={register({ required: "???????????? ??????????????????" })}
                    name="trackingNumber"
                    placeholder="?????????????????? 16?????? ??????"
                    readOnly
                  ></StyledInput>
                </FlexBox>
                <ProductSelectBox>
                  <StyledInput
                    readOnly
                    defaultValue={orderItem.status}
                  ></StyledInput>
                </ProductSelectBox>
                <FlexBox>
                  <StyledInput
                    ref={register()}
                    defaultValue={orderItem.memo}
                    name="memo"
                    readOnly
                    placeholder="????????? ?????? ??????(???: ???????????? ????????? 36 --> 38, ??????)"
                  ></StyledInput>
                </FlexBox>
              </ProductItem>
            ))}
          </ShipBox>

          <InfoBox>
            <SubHeader>????????????</SubHeader>
            <InputBox>
              <span>????????????</span>
              <StyledInput
                defaultValue={creditCard || ""}
                name="creditCard"
                placeholder="???????????? 16?????? ??????"
                readOnly
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>????????????(???/???)</span>
              <StyledInput
                defaultValue={data?.seeOrderDetail?.user?.expireDate || ""}
                name="expireDate"
                placeholder="Month/Year 4??????"
                readOnly
              ></StyledInput>
            </InputBox>
            <InputBox>
              <span>cvc ??????</span>
              <StyledInput
                defaultValue={cvcNumber || ""}
                name="cvcNumber"
                placeholder="cvc????????? ???????????????"
                readOnly
              ></StyledInput>
            </InputBox>
          </InfoBox>
        </FormContainer>
      </form>
    </div>
  );
}
export default ReturnedOrder;
