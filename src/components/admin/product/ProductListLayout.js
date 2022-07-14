import styled from "styled-components";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import ProductList from "./ProductList";

const Layer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 24%;
  max-height: 100px;
  display: flex;
  align-items: center;
`;

const H1 = styled.span`
  font-weight: 500;
  font-size: 30px;
  margin-left: 20px;
`;

const SearchBarBox = styled.div`
  width: 100%;
  margin-left: 20px;
  height: 60%;
`;

const SearchContent = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const FilterBox = styled.div`
  display: flex;

  justify-content: end;
  padding-right: 30px;
`;

const SearchInput = styled.input`
  width: 30%;
  height: 30px;
  border: solid 2px darkgreen;
  padding-left: 10px;
  margin-top: 4px;
  :focus {
    border: solid 2px ${(props) => props.theme.primary};
  }
`;

const SearchBt = styled.input`
  margin-top: 4px;
  width: 60px;
  padding: 7px 0px;
  background-color: ${(props) => props.theme.secondary};
  color: white;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const ProductSelect = styled.select`
  width: 100%;
  height: 34px;
  border-radius: 0px;
  padding: 6px 20px;
  background-color: white;
  border: 2px solid ${(props) => props.theme.primary};
  margin-top: 4px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
`;

const InputContainer = styled.div`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
`;

const SEE_PRODUCTS_QUERY = gql`
  query seeProducts($adName: String, $isActive: String, $packageName: String) {
    seeProducts(
      adName: $adName
      isActive: $isActive
      packageName: $packageName
    ) {
      id
      adName
      price
      totalOrderAmount
    }
  }
`;

function ProductListLayout() {
  const [adName, setAdName] = useState("");
  const [isActive, setIsActive] = useState("active");
  const [packageName, setPackageName] = useState("all");

  const { register, handleSubmit, formState } = useForm();

  const { data } = useQuery(SEE_PRODUCTS_QUERY, {
    variables: {
      isActive,
      adName,
      packageName,
    },
  });

  const handleBt = () => {
    const productName = document.getElementById("productNameIp");
    setAdName(productName.value);
  };
  const isActveBt = (e) => {
    setIsActive(e.target.value);
  };
  const packageBt = (e) => {
    setPackageName(e.target.value);
  };

  return (
    <>
      <Layer>
        <Container>
          <HeaderBox>
            <H1>Pages</H1>
            <SearchBarBox>
              <form onSubmit={handleSubmit()}>
                <FilterBox>
                  <InputContainer>
                    <ProductSelect
                      ref={register({ required: "패키지이름" })}
                      name="packageName"
                      onChange={packageBt}
                    >
                      <option value="all">모든플랫폼</option>
                      <option value="kakao">카카오</option>
                      <option value="naver">네이버</option>
                      <option value="google">구글</option>
                      <option value="facebook">페이스북</option>
                      <option value="instagram">인스타그램</option>
                    </ProductSelect>
                  </InputContainer>
                  <InputContainer>
                    <ProductSelect
                      ref={register({ required: "활성 비활성" })}
                      name="isActive"
                      onChange={isActveBt}
                    >
                      <option value="active">광고중</option>
                      <option value="inActive">광고중지</option>
                    </ProductSelect>
                  </InputContainer>
                </FilterBox>
                <SearchContent>
                  <SearchInput
                    ref={register({ required: false })}
                    name="adName"
                    type="text"
                    placeholder="광고 소재를 입력하세요"
                    id="productNameIp"
                  ></SearchInput>
                  <SearchBt readOnly onClick={handleBt} value="검색"></SearchBt>
                </SearchContent>
              </form>
            </SearchBarBox>
          </HeaderBox>

          {/* 컨텐트 시작 */}
          <ProductList data={data} isActive={isActive}></ProductList>
        </Container>
      </Layer>
    </>
  );
}

export default ProductListLayout;
