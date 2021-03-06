import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthButton from "../../auth/AuthButton";

const UploadContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 100%;
`;

const Subtitle = styled.span`
  font-size: 24px;
  padding: 20px 40px;
`;

const ProductInput = styled.input`
  width: 100%;
  border-radius: 2px;
  padding: 7px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
`;

const ProductSelect = styled.select`
  width: 100%;
  height: 38px;
  border-radius: 2px;
  padding: 7px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
`;

const InputName = styled.span`
  display: flex;
  width: 100px;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const UploadFormBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 40px 25px 40px;

  form {
    margin-top: 4px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const CREATE_PRODUCT_MUTATION = gql`
  mutation uploadProduct(
    $productName: String!
    $price: Int!
    $adName: String!
    $packageName: String!
    $detailPage1: String!
    $productSliderPicture: String
  ) {
    uploadProduct(
      productName: $productName
      price: $price
      adName: $adName
      packageName: $packageName
      detailPage1: $detailPage1
      productSliderPicture: $productSliderPicture
    ) {
      ok
      error
    }
  }
`;

function ProductUploadLayout() {
  const onCompleted = (data) => {
    const {
      uploadProduct: { ok, error },
    } = data;
    if (!ok) {
      alert(error);
      return;
    } else {
      alert("????????? ?????????????????????.");
    }
  };
  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    if (data.price) {
      data.price = parseInt(data.price);
    }

    console.log(data);

    createProduct({
      variables: {
        ...data,
      },
    });
  };

  return (
    <UploadContainer>
      <Subtitle>????????????</Subtitle>
      <UploadFormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputContainer>
            <InputName>?????????</InputName>
            <ProductSelect
              ref={register({ required: "???????????? ??????????????????" })}
              name="productName"
              type="text"
              placeholder="?????????"
            >
              <option>????????????</option>
              <option>??????1</option>
              <option>??????2</option>
            </ProductSelect>
          </InputContainer>
          <InputContainer>
            <InputName>??????</InputName>
            <ProductSelect
              ref={register({ required: "??????" })}
              name="price"
              type="text"
              placeholder="??????"
            >
              <option>79000</option>
              <option>129000</option>
            </ProductSelect>
          </InputContainer>
          <InputContainer>
            <InputName>?????? ?????? ??????</InputName>
            <ProductInput
              ref={register({ required: "?????? ??????" })}
              name="adName"
              type="text"
              placeholder="?????? ?????? ??????"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>????????? ??????</InputName>
            <ProductSelect
              ref={register({ required: "????????? ??????" })}
              name="packageName"
              type="text"
            >
              <option>kakao</option>
              <option>naver</option>
              <option>instagram</option>
              <option>facebook</option>
              <option>google</option>
            </ProductSelect>
          </InputContainer>
          <InputContainer>
            <InputName>?????????(HTML)</InputName>
            <ProductInput
              ref={register({ required: "?????????1" })}
              name="detailPage1"
              type="text"
              placeholder="HTML"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>PC??????</InputName>
            <ProductInput
              ref={register()}
              name="productSliderPicture"
              type="text"
              placeholder=",??? ??????(optional)"
              defaultValue="http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung1.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung2.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung3.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung4.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung5.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung6.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung7.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung8.png,"
            ></ProductInput>
          </InputContainer>
          <AuthButton
            type="submit"
            value="????????????"
            disabled={!formState.isValid || loading}
          />
        </form>
      </UploadFormBox>
    </UploadContainer>
  );
}
export default ProductUploadLayout;
