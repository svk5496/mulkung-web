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

const EDIT_PRODUCT_MUTATION = gql`
  mutation editProduct(
    $productName: String!
    $price: Int!
    $detailPage1: String!
    $detailPage2: String!
    $color: String
    $size: String
    $productSliderPicture: String
  ) {
    editProduct(
      productName: $productName
      price: $price
      detailPage1: $detailPage1
      detailPage2: $detailPage2
      color: $color
      size: $size
      productSliderPicture: $productSliderPicture
    ) {
      ok
      error
    }
  }
`;

function ProductEditLayout() {
  const onCompleted = (data) => {
    const {
      editProduct: { ok, error },
    } = data;
    if (!ok) {
      alert(error);
      return;
    } else {
      alert("등록이 완료되었습니다.");
    }
  };
  const [createProduct, { loading }] = useMutation(EDIT_PRODUCT_MUTATION, {
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
      <Subtitle>상품수수수수수정!</Subtitle>
      <UploadFormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputContainer>
            <InputName>상품명</InputName>
            <ProductInput
              ref={register({ required: "상품명을 입력해주세요" })}
              name="productName"
              type="text"
              placeholder="상품명"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>가격</InputName>
            <ProductInput
              ref={register({ required: "가격" })}
              name="price"
              type="text"
              placeholder="가격"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>페이지1</InputName>
            <ProductInput
              ref={register({ required: "페이지1" })}
              name="detailPage1"
              type="text"
              placeholder="HTML"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>페이지2</InputName>
            <ProductInput
              ref={register({ required: "페이지2" })}
              name="detailPage2"
              type="text"
              placeholder="HTML"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>컬러</InputName>
            <ProductInput
              ref={register()}
              name="color"
              type="text"
              placeholder=",로 구분(optional)"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>사이즈</InputName>
            <ProductInput
              ref={register()}
              name="size"
              type="text"
              placeholder=",로 구분(optional)"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>사진</InputName>
            <ProductInput
              ref={register()}
              name="productSliderPicture"
              type="text"
              placeholder=",로 구분(optional)"
            ></ProductInput>
          </InputContainer>
          <AuthButton
            type="submit"
            value="수수수수정하기"
            disabled={!formState.isValid || loading}
          />
        </form>
      </UploadFormBox>
    </UploadContainer>
  );
}
export default ProductEditLayout;
