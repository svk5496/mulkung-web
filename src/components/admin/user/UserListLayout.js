import styled from "styled-components";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import UserList from "./UserList";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.css";
import { PaginationBox, RowFlexBox, StyledSelect } from "../../shared";
import {
  beforeEntire,
  beforeHalf,
  beforeMonth,
  beforeQuarter,
  beforeWeek,
  beforeYear,
  myEndDate,
  myStartDate,
  week,
} from "../../sharedFunction";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { HiddenInput } from "../../shared";

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
`;

const LeftBar = styled.div`
  width: 400px;
  margin-top: 20px;
  margin-left: 20px;
  height: 85vh;
`;

const LeftBarLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-right: solid darkgrey 1px;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const H1 = styled.span`
  font-weight: 500;
  font-size: 30px;
  margin-left: 20px;
`;

const SearchInputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border: solid 1px darkgreen;
  border-radius: 3px;
  padding-left: 10px;
  margin-top: 4px;
  :focus {
    border: solid 2px ${(props) => props.theme.primary};
  }
`;

const SelectInput = styled(StyledSelect)`
  border: solid 1px darkgreen;
`;

const SearchBt = styled.input`
  margin-top: 4px;
  width: 100%;
  height: 20px;
  padding: 7px 0px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.secondary};
  color: white;
  margin-top: 10px;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

const Subtitle = styled.span`
  font-size: 12px;
  padding: 15px 0px 0px 0px;
  color: gray;
`;

const SearchDateContainer = styled.div`
  width: 100%;
  height: 140px;
  margin-top: 10px;
`;

const DateInputBox = styled.div`
  width: 46%;
  height: 34px;
  border: solid 1px darkgreen;
  margin: 0px 0px;
  padding-left: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DateBt = styled.div`
  width: 100%;
  height: 30px;
  border: 1px darkgreen solid;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin: 3px;
  cursor: pointer;
  span {
    font-size: 6px;
  }
`;

const UserListBox = styled.div`
  width: 100%;
`;

const SEE_USERS_QUERY = gql`
  query seeUsers(
    $page: Int!
    $firstName: String
    $gender: String
    $packageName: String
    $startDate: String
    $endDate: String
  ) {
    seeUsers(
      page: $page
      firstName: $firstName
      gender: $gender
      packageName: $packageName
      startDate: $startDate
      endDate: $endDate
    ) {
      ok
      error
      totalPages
      totalUsers
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
  const [startDate, setStartDate] = useState(beforeWeek);
  const [endDate, setEndDate] = useState(myEndDate);
  const [firstName, setFirstName] = useState("");
  const [packageName, setPackageName] = useState("??????");
  const [gender, setGender] = useState("??????");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { register, handleSubmit, formState } = useForm();

  const { data } = useQuery(SEE_USERS_QUERY, {
    variables: {
      firstName,
      page: page,
      packageName,
      gender,
      startDate,
      endDate,
    },
  });

  const onValid = () => {
    const firstName = document.getElementById("firstNameIp");
    setFirstName(firstName.value);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const totalPage = data?.seeUsers.totalPages;

  //?????? ?????? ?????????
  const todayBt = () => {
    setStartDate(myStartDate);
    setEndDate(myEndDate);
  };
  const weekBt = () => {
    setStartDate(beforeWeek);
    setEndDate(myEndDate);
  };
  const monthBt = () => {
    setStartDate(beforeMonth);
    setEndDate(myEndDate);
  };
  const quarterBt = () => {
    setStartDate(beforeQuarter);
    setEndDate(myEndDate);
  };
  const halfBt = () => {
    setStartDate(beforeHalf);
    setEndDate(myEndDate);
  };
  const yearBt = () => {
    setStartDate(beforeYear);
    setEndDate(myEndDate);
  };
  const entireBt = () => {
    setStartDate(beforeEntire);
    setEndDate(myEndDate);
  };

  const packageBt = (e) => {
    setPackageName(e.target.value);
  };

  const genderBt = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Layer>
        <Container>
          <LeftBar>
            <H1>User</H1>

            <LeftBarLayout>
              <form onSubmit={handleSubmit(onValid)}>
                <SearchInputBox>
                  <Subtitle>??????</Subtitle>
                  <SearchInput
                    ref={register({ required: false })}
                    name="firstName"
                    type="text"
                    placeholder="????????? ???????????????"
                    id="firstNameIp"
                  ></SearchInput>
                </SearchInputBox>

                <SearchBt readOnly type="submit" value="??????"></SearchBt>

                <SearchInputBox>
                  <Subtitle>????????????</Subtitle>
                  <SelectInput
                    ref={register({ required: false })}
                    name="packageName"
                    id="adNameIp"
                    onChange={packageBt}
                  >
                    <option value="??????">???????????????</option>
                    <option value="kakao">?????????</option>
                    <option value="naver">?????????</option>
                    <option value="google">??????</option>
                    <option value="facebook">????????????</option>
                    <option value="instagram">???????????????</option>
                  </SelectInput>
                </SearchInputBox>

                <SearchInputBox>
                  <Subtitle>??????</Subtitle>
                  <SelectInput
                    ref={register({ required: false })}
                    name="gender"
                    id="adNameIp"
                    onChange={genderBt}
                  >
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                    <option value="??????">??????</option>
                  </SelectInput>
                </SearchInputBox>

                <SearchDateContainer>
                  <Subtitle>?????? ??????</Subtitle>
                  <RowFlexBox>
                    <DateInputBox>
                      <DatePicker
                        selected={startDate}
                        locale={ko}
                        onChange={(date) => setStartDate(date)}
                      ></DatePicker>
                    </DateInputBox>
                    <span>~</span>
                    <DateInputBox>
                      <DatePicker
                        selected={endDate}
                        locale={ko}
                        onChange={(date) => setEndDate(date)}
                      ></DatePicker>
                    </DateInputBox>
                  </RowFlexBox>

                  <RowFlexBox>
                    <DateBt onClick={todayBt}>??????</DateBt>
                    <DateBt onClick={weekBt}>1???</DateBt>
                    <DateBt onClick={monthBt}>1??????</DateBt>
                    <DateBt onClick={quarterBt}>3??????</DateBt>
                    <DateBt onClick={halfBt}>6??????</DateBt>
                    <DateBt onClick={yearBt}>1???</DateBt>
                  </RowFlexBox>
                  <RowFlexBox>
                    <DateBt onClick={entireBt}>??????</DateBt>
                    <HiddenInput
                      ref={register({ required: true })}
                      name="startDate"
                      defaultValue={startDate.toISOString()}
                    ></HiddenInput>
                    <HiddenInput
                      ref={register({ required: true })}
                      name="endDate"
                      defaultValue={endDate.toISOString()}
                    ></HiddenInput>
                  </RowFlexBox>
                </SearchDateContainer>
              </form>
            </LeftBarLayout>
          </LeftBar>
          <UserListBox>
            {/* ????????? ?????? */}

            <UserList data={data}></UserList>
            <PaginationBox>
              <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={totalPage * 10}
                pageRangeDisplayed={5}
                prevPageText={"??????"}
                nextPageText={"??????"}
                onChange={handlePageChange}
              ></Pagination>
            </PaginationBox>
          </UserListBox>
        </Container>
      </Layer>
    </>
  );
}

export default UserListLayout;
