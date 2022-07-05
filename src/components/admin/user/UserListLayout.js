import styled from "styled-components";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import UserList from "./UserList";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.css";

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
  height: 20px;
  padding: 7px 0px;
  background-color: ${(props) => props.theme.secondary};
  color: white;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    margin: 0px 5px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: green;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: ${(props) => props.theme.secondary};
    border-radius: 20px;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: green;
  }
  a {
    text-decoration: none;
  }
`;

const SEE_USERS_QUERY = gql`
  query seeUsers($page: Int!, $firstName: String) {
    seeUsers(page: $page, firstName: $firstName) {
      ok
      error
      totalPages
      Users {
        id
        firstName
        phone
        totalPurchase
      }
    }
  }
`;

function UserListLayout() {
  const [firstName, setFirstName] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { register, handleSubmit, formState } = useForm();

  const { data } = useQuery(SEE_USERS_QUERY, {
    variables: {
      firstName,
      page: page,
    },
  });

  const onValid = () => {
    const userName = document.getElementById("userNameIp");
    setFirstName(userName.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const totalPage = data?.seeUsers.totalPages;

  return (
    <>
      <Layer>
        <Container>
          <HeaderBox>
            <H1>User</H1>
            <SearchBarBox>
              <form onSubmit={handleSubmit(onValid)}>
                <SearchContent>
                  <SearchInput
                    ref={register({ required: false })}
                    name="productName"
                    type="text"
                    placeholder="이름이나 번호를 입력하세요"
                    id="userNameIp"
                  ></SearchInput>
                  <SearchBt readOnly type="submit" value="검색"></SearchBt>
                </SearchContent>
              </form>
            </SearchBarBox>
          </HeaderBox>

          {/* 컨텐트 시작 */}
          <UserList data={data}></UserList>
          <PaginationBox>
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={totalPage * 10}
              pageRangeDisplayed={5}
              prevPageText={"이전"}
              nextPageText={"다음"}
              onChange={handlePageChange}
            ></Pagination>
          </PaginationBox>
        </Container>
      </Layer>
    </>
  );
}

export default UserListLayout;
