import styled from "styled-components";
import OrderHeader from "./Header";
import { useForm } from "react-hook-form";

import "react-calendar/dist/Calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { HiddenInput } from "../../shared";
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
import OrderSentList from "./SentList";
import { parseTwoDigitYear } from "moment";
import ReturnedList from "./ReturnedList";

const Layer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
`;

const LeftBar = styled.div`
  width: 400px;
  margin-left: 20px;
  height: 85vh;
`;

const LeftBarLayout = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-right: solid darkgrey 1px;
`;

const SearchInput = styled.input`
  width: 95%;
  height: 30px;
  border: solid 2px darkgreen;
  padding-left: 10px;
  margin-top: 4px;
  :focus {
    border: solid 2px ${(props) => props.theme.primary};
  }
`;

const Subtitle = styled.span`
  font-size: 12px;
  padding: 10px 0px;
  color: gray;
`;

const SearchDateContainer = styled.div`
  width: 100%;
  height: 140px;
  margin-top: 10px;
`;

export const RowFlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
  span {
    margin: 10px;
  }
`;

const DateInputBox = styled.div`
  width: 100%;
  height: 34px;
  border: solid 1px darkgreen;
  margin: 0px 3px;
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

const SearchBt = styled.div`
  width: 100%;
  height: 40px;
  background-color: darkslategray;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
  color: white;
  span {
    color: white;
  }
`;

const SEE_SENT_ORDER_QUERY = gql`
  query seeOrders(
    $firstName: String
    $phone: String
    $startDate: String
    $endDate: String
    $status: String
  ) {
    seeOrders(
      firstName: $firstName
      phone: $phone
      startDate: $startDate
      endDate: $endDate
      status: $status
    ) {
      id
      orderMethod
      status
      createdAt
      updatedAt
      user {
        firstName
        phone
      }
      orderItems {
        amount
        color
        size
        createdAt
        updatedAt
        status
        trackingNumber
      }
    }
  }
`;

function OrderReturnedLayout() {
  const [startDate, setStartDate] = useState(beforeWeek);
  const [endDate, setEndDate] = useState(myEndDate);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { register, handleSubmit, formState } = useForm();

  const { data } = useQuery(SEE_SENT_ORDER_QUERY, {
    variables: {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      firstName: name,
      phone: phone,
      status: "returned",
    },
  });

  //시간 선택 버튼들
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

  const handleBt = () => {
    const firstName = document.getElementById("firstNameIp");
    const phone = document.getElementById("phoneIp");
    setName(firstName.value);
    setPhone(phone.value);
  };

  return (
    <>
      <Layer>
        <OrderHeader />
        <Container>
          <LeftBar>
            <LeftBarLayout>
              <form onSubmit={handleSubmit()}>
                <Subtitle>검색어</Subtitle>
                <SearchInput
                  ref={register({ required: false })}
                  name="firstName"
                  type="text"
                  placeholder="이름을 입력하세요"
                  id="firstNameIp"
                ></SearchInput>
                <SearchInput
                  ref={register({ required: false })}
                  name="phone"
                  type="text"
                  placeholder="전화번호를 입력하세요"
                  id="phoneIp"
                ></SearchInput>
                <SearchDateContainer>
                  <Subtitle>날짜 검색</Subtitle>
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
                    <DateBt onClick={todayBt}>오늘</DateBt>
                    <DateBt onClick={weekBt}>1주</DateBt>
                    <DateBt onClick={monthBt}>1개월</DateBt>
                    <DateBt onClick={quarterBt}>3개월</DateBt>
                    <DateBt onClick={halfBt}>6개월</DateBt>
                    <DateBt onClick={yearBt}>1년</DateBt>
                  </RowFlexBox>
                  <RowFlexBox>
                    <DateBt onClick={entireBt}>전체</DateBt>
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
                <SearchBt onClick={handleBt}>
                  <span>검색</span>
                </SearchBt>
              </form>
            </LeftBarLayout>
          </LeftBar>
          {/* 컨텐트 시작 */}
          <ReturnedList data={data}></ReturnedList>
        </Container>
      </Layer>
    </>
  );
}

export default OrderReturnedLayout;
