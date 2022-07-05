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
  height: 10%;
`;

const SearchContent = styled.div`
  width: 97%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
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

const SEE_PRODUCTS_QUERY = gql`
  query seeProducts($productName: String) {
    seeProducts(productName: $productName) {
      id
      productName
      price
    }
  }
`;

function ProductListLayout() {
  const [name, setName] = useState("");

  const { register, handleSubmit, formState } = useForm();
  console.log(name);

  const { data } = useQuery(SEE_PRODUCTS_QUERY, {
    variables: {
      productName: name,
    },
  });

  const handleBt = () => {
    const productName = document.getElementById("productNameIp");
    setName(productName.value);
  };

  return (
    <>
      <Layer>
        <Container>
          <HeaderBox>
            <H1>Product</H1>
            <SearchBarBox>
              <form onSubmit={handleSubmit()}>
                <SearchContent>
                  <SearchInput
                    ref={register({ required: false })}
                    name="productName"
                    type="text"
                    placeholder="상품명을 입력하세요"
                    id="productNameIp"
                  ></SearchInput>
                  <SearchBt readOnly onClick={handleBt} value="검색"></SearchBt>
                </SearchContent>
              </form>
            </SearchBarBox>
          </HeaderBox>

          {/* 컨텐트 시작 */}
          <ProductList data={data}></ProductList>
        </Container>
      </Layer>
    </>
  );
}

export default ProductListLayout;