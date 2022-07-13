import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import AuthButton from "../../auth/AuthButton";
import { useParams } from "react-router-dom";
import { HiddenInput } from "../../shared";

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

const SEE_PRODUCT_DETAIL_QUERY = gql`
  query seeProductDetail($id: Int!) {
    seeProductDetail(id: $id) {
      id
      productName
      price
      detailPage1
      detailPage2
      productSliderPictures {
        productSliderPicture
      }
    }
  }
`;

const EDIT_PRODUCT_MUTATION = gql`
  mutation editProduct(
    $id: Int!
    $productName: String!
    $price: Int!
    $adName: String!
    $packageName: String!
    $detailPage1: String!
    $productSliderPicture: String
  ) {
    uploadProduct(
      id: $id
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

function EditLayout() {
  const onCompleted = (data) => {
    const {
      editProduct: { ok, error },
    } = data;
    if (!ok) {
      alert(error);
      return;
    } else {
      alert("변경이 완료되었습니다.");
    }
  };

  const { id } = useParams();

  const { _, data } = useQuery(SEE_PRODUCT_DETAIL_QUERY, {
    variables: {
      id: parseInt(id),
    },
  });

  console.log(data);

  const [editProduct, { loading }] = useMutation(EDIT_PRODUCT_MUTATION, {
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

    data.id = parseInt(data.id);

    editProduct({
      variables: {
        ...data,
      },
    });
  };
  return (
    <UploadContainer>
      <Subtitle>상품수정</Subtitle>
      <UploadFormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <InputContainer>
            <InputName>상품명</InputName>
            <ProductSelect
              ref={register({ required: "상품명을 입력해주세요" })}
              name="productName"
              type="text"
              placeholder="상품명"
            >
              <option>물컹슈즈</option>
              <option>벌집1</option>
              <option>벌집2</option>
            </ProductSelect>
          </InputContainer>
          <HiddenInput
            ref={register()}
            name="id"
            defaultValue={parseInt(id)}
            type="text"
            placeholder="아이디"
          ></HiddenInput>

          <InputContainer>
            <InputName>가격</InputName>
            <ProductSelect
              ref={register({ required: "가격" })}
              name="price"
              type="text"
              placeholder="가격"
            >
              <option>79000</option>
              <option>129000</option>
            </ProductSelect>
          </InputContainer>
          <InputContainer>
            <InputName>광고 소재 이름</InputName>
            <ProductInput
              ref={register({ required: "광고 소재" })}
              name="adName"
              type="text"
              placeholder="광고 소재 이름"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>패키지 이름</InputName>
            <ProductSelect
              ref={register({ required: "패키지 이름" })}
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
            <InputName>페이지(HTML)</InputName>
            <ProductInput
              ref={register({ required: "페이지1" })}
              name="detailPage1"
              type="text"
              placeholder="HTML"
            ></ProductInput>
          </InputContainer>
          <InputContainer>
            <InputName>PC사진</InputName>
            <ProductInput
              ref={register()}
              name="productSliderPicture"
              type="text"
              placeholder=",로 구분(optional)"
              defaultValue="http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung1.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung2.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung3.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung4.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung5.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung6.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung7.png, http://gi.esmplus.com/kishop1121/mulkung-web/images/mulkung8.png,"
            ></ProductInput>
          </InputContainer>
          <AuthButton type="submit" value="수정하기" />
        </form>
      </UploadFormBox>
    </UploadContainer>
  );
}
export default EditLayout;
