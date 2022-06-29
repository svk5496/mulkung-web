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
  width: auto;
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
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const PlaceOrderBt = styled.div`
  padding: 8px 20px;
  background-color: ${(props) => props.theme.primary};
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteBt = styled(PlaceOrderBt)`
  background-color: tomato;
`;

const UserInfo = styled.div`
  display: flex;
  width: 50vw;

  justify-content: space-between;
`;

const DELETE_ORDER_MUTATION = gql`
  mutation deleteOrder($id: Int!) {
    deleteOrder(id: $id) {
      ok
      error
    }
  }
`;

function RefundedList({ data }) {
  const [checkedList, setCheckedList] = useState([]);

  const dataList = [];

  if (data?.seeOrders) {
    data.seeOrders?.forEach((order) => dataList.push(order));
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
      deleteOrder: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
  };

  const [deleteOrder, { loading }] = useMutation(DELETE_ORDER_MUTATION, {
    onCompleted,
  });

  const deleteBt = () => {
    for (let i = 0; i < checkedList.length; i++) {
      deleteOrder({
        variables: {
          id: checkedList[i].id,
        },
      });
    }
    if (checkedList.length > 0) {
      alert("삭제가 완료되었습니다.");
      window.location.reload();
    } else {
      alert("삭제할 항목을 먼저 눌러주세요");
    }
  };

  return (
    <Content>
      {loading ? null : (
        <div>
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
              <span>결제 완료 주문</span>
            </label>
            <ButtonContainer>
              <PlaceOrderBt>
                <span></span>
              </PlaceOrderBt>

              {/* <DeleteBt onClick={deleteBt}>
                <span></span>
              </DeleteBt> */}
            </ButtonContainer>
          </SubjectContainer>
          <UserContainer>
            {data?.seeOrders.length > 0 ? (
              <div>
                {data?.seeOrders?.map((order) => (
                  <UserRow key={order.id}>
                    <label>
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          onCheckedElement(e.target.checked, order)
                        }
                        checked={checkedList.includes(order) ? true : false}
                      ></input>
                    </label>
                    <Link to={`/rhksflwkdjemals/order/returned/${order.id}`}>
                      <UserInfo>
                        <span>{order.user.firstName}</span>
                        <span>
                          {order.user.phone.replace(
                            /(^02.{0}|^01.{1}|^[0-9]{3})([0-9]*)([0-9]{4})/,
                            "$1--$2--$3"
                          )}
                        </span>
                        <span>
                          {new Date(
                            parseInt(order.createdAt)
                          ).toLocaleDateString()}
                        </span>
                      </UserInfo>
                    </Link>
                  </UserRow>
                ))}
              </div>
            ) : (
              <div>새로운 환불완료건이 없습니다 </div>
            )}
          </UserContainer>
        </div>
      )}
    </Content>
  );
}
export default RefundedList;
