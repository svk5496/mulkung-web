import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import { useCallback, useState } from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

import routes from "../../../screens/routes";

const Content = styled.main`
  display: flex;

  flex-direction: column;
  padding: 0px 20px;
  margin-right: 30px;
  width: 100%;
`;

const SubjectContainer = styled.div`
  width: auto;

  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${(props) => props.theme.bgGray};
  span {
  }
  label {
    cursor: pointer;
  }
  input {
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    -ms-appearance: checkbox !important;
    -o-appearance: checkbox !important;
    appearance: checkbox !important;
    accent-color: ${(props) => props.theme.secondary};

    margin-right: 10px;
  }
`;

const UserContainer = styled.div`
  width: auto;
  display: flex;

  flex-direction: column;
`;

const UserRow = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  display: flex;
  border-bottom: solid 1px lightgrey;
  input {
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    -ms-appearance: checkbox !important;
    -o-appearance: checkbox !important;
    appearance: checkbox !important;
    margin-right: 10px;
    accent-color: ${(props) => props.theme.secondary};
  }
  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const PlaceOrderBt = styled.div`
  padding: 8px 20px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`;

const InActiveBt = styled(PlaceOrderBt)`
  background-color: tomato;
`;

const ActiveBt = styled(PlaceOrderBt)`
  background-color: skyblue;
`;

const UserInfo = styled.div`
  display: flex;
  width: 100%;

  justify-content: space-between;
`;

const ACTIVE_PRODUCT_MUTATION = gql`
  mutation activeProduct($id: Int!, $isActive: String!) {
    activeProduct(id: $id, isActive: $isActive) {
      ok
      error
    }
  }
`;

function ProductList({ data, isActive }) {
  const [checkedList, setCheckedList] = useState([]);

  const dataList = [];

  if (data?.seeProducts) {
    data.seeProducts?.forEach((product) => dataList.push(product));
  }

  const onCheckedAll = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];
        dataList.forEach((list) => checkedListArray.push(list));
        setCheckedList(checkedListArray);
      } else {
        setCheckedList([]);
      }
    },
    [dataList]
  );

  const onCheckedElement = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedList([...checkedList, list]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== list));
      }
    },
    [checkedList]
  );

  const onCompleted = (data) => {
    const {
      activeProduct: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
  };

  const [activeProduct, { loading }] = useMutation(ACTIVE_PRODUCT_MUTATION, {
    onCompleted,
  });

  const inActiveBt = () => {
    for (let i = 0; i < checkedList.length; i++) {
      activeProduct({
        variables: {
          id: checkedList[i].id,
          isActive: "inActive",
        },
      });
    }
    if (checkedList.length > 0) {
      alert("비활성화가 완료되었습니다.");
      window.location.reload();
    } else {
      alert("체크박스를 먼저 눌러주세요");
    }
  };

  const activeBt = () => {
    for (let i = 0; i < checkedList.length; i++) {
      activeProduct({
        variables: {
          id: checkedList[i].id,
          isActive: "active",
        },
      });
    }
    if (checkedList.length > 0) {
      alert("활성화가 완료되었습니다.");
      window.location.reload();
    } else {
      alert("체크박스를 먼저 눌러주세요");
    }
  };

  return (
    <Content>
      {loading ? null : (
        <div>
          <ButtonContainer>
            <Link to={routes.adminProductNew}>
              <PlaceOrderBt>
                <span>신규 상품 등록</span>
              </PlaceOrderBt>
            </Link>
            {isActive === "active" ? (
              <InActiveBt onClick={inActiveBt}>
                <span>비활성화</span>
              </InActiveBt>
            ) : (
              <ActiveBt onClick={activeBt}>
                <span>활성화</span>
              </ActiveBt>
            )}
          </ButtonContainer>
          <SubjectContainer>
            <label>
              <input
                type="checkbox"
                onChange={(e) => onCheckedAll(e.target.checked)}
                checked={
                  checkedList?.length === 0
                    ? false
                    : checkedList?.length === dataList?.length
                    ? true
                    : false
                }
              ></input>
              <span>id</span>
            </label>
            <span>소재이름</span>
            <span>가격</span>
            <span>판매량</span>
            <span></span>
          </SubjectContainer>

          <UserContainer>
            {data?.seeProducts.length > 0 ? (
              <div>
                {data?.seeProducts?.map((product) => (
                  <UserRow key={product.id}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          onCheckedElement(e.target.checked, product)
                        }
                        checked={checkedList.includes(product) ? true : false}
                      ></input>
                    </label>
                    <Link to={`/rhksflwkdjemals/product/edit/${product.id}`}>
                      <UserInfo>
                        <span>{product.id}</span>
                        <span>{product.adName}</span>
                        <span>{product.price}</span>
                        <span>{product.totalOrderAmount}</span>
                        <span></span>
                      </UserInfo>
                    </Link>
                  </UserRow>
                ))}
              </div>
            ) : (
              <div>조회된 페이지가 없습니다.</div>
            )}
          </UserContainer>
        </div>
      )}
    </Content>
  );
}
export default ProductList;
