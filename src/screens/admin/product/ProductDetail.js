import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Chart from "react-apexcharts";
import EditBox from "../../../components/admin/product/EditBox";
import {
  formatedDay0,
  formatedDay1,
  formatedDay2,
  formatedDay3,
  formatedDay4,
  formatedDay5,
  formatedDay6,
} from "../../../components/sharedFunction";

const UploadContainer = styled.div`
  padding-top: 40px;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: baseline;
`;

const Subtitle = styled.span`
  font-size: 24px;
  padding: 20px 40px;
`;

const EditModeBt = styled.div`
  display: flex;
  padding: 8px 20px;
  margin-right: 30px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.borderColor};
  :hover {
    cursor: pointer;
  }
`;

const InfoBox = styled.div`
  width: 100%;
  height: 100%;
`;

const DashContainer = styled.div`
  width: 100%;
  height: 30%;
  padding: 0px 30px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`;

const DashBox = styled.div`
  min-width: 300px;
  width: 100%;
  margin: 0px 20px;
  min-height: 200px;
  height: 100%;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.15);
`;

const UpperDashBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h1 {
    font-size: 24px;
    color: gray;
  }
`;

const MiddleDashBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  span {
    font-size: 36px;
  }
`;
const BottomDashBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    text-decoration: underline;
    font-size: 16px;
    :hover {
      cursor: pointer;
    }
  }
  a {
    color: black;
  }
`;

const ChartContainer = styled(DashContainer)`
  min-height: 300px;
  height: 44%;
`;

const ChartBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChartBottomBox = styled(BottomDashBox)`
  span {
    text-decoration: none;
  }
`;

const SEE_PRODUCT_DASH_BOARD_QUERY = gql`
  query SeeProductDashBoard($id: Int!) {
    seeProductDashBoard(id: $id) {
      ok
      error
      countOrders
      countOrderItems
      TotalPurchase7Days
      chart1Object {
        name
        data
      }
    }
  }
`;

function ProductDetail() {
  const { id } = useParams();
  const { _, data } = useQuery(SEE_PRODUCT_DASH_BOARD_QUERY, {
    variables: {
      id: parseInt(id),
    },
  });

  const option = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      fill: {
        colors: ["#307157"],
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datatime",
        categories: [
          formatedDay6,
          formatedDay5,
          formatedDay4,
          formatedDay3,
          formatedDay2,
          formatedDay1,
          formatedDay0,
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
      dataLabels: {
        style: {
          colors: ["#307157"],
        },
      },
    },
  };
  console.log(data);

  const [editMode, setEditMode] = useState(false);

  return (
    <UploadContainer>
      <Header>
        <Subtitle>페이지 정보</Subtitle>
        <EditModeBt
          onClick={() => {
            setEditMode(!editMode);
          }}
        >
          <span>수정하기</span>
        </EditModeBt>
      </Header>
      {editMode ? <EditBox></EditBox> : null}
      <InfoBox>
        <DashContainer>
          <DashBox>
            <UpperDashBox>
              <h1>구입하기 클릭수(total)</h1>
              <span></span>
            </UpperDashBox>
            <MiddleDashBox>
              <span>{data?.seeProductDashBoard?.countOrders}</span>
            </MiddleDashBox>
            <BottomDashBox></BottomDashBox>
          </DashBox>
          <DashBox>
            <UpperDashBox>
              <h1>실제 구매 수</h1>
              <span></span>
            </UpperDashBox>
            <MiddleDashBox>
              <span>{data?.seeProductDashBoard?.countOrderItems}</span>
            </MiddleDashBox>
            <BottomDashBox></BottomDashBox>
          </DashBox>
          <DashBox>
            <UpperDashBox>
              <h1>구입하기 클릭수(7일)</h1>
              <span></span>
            </UpperDashBox>
            <MiddleDashBox>
              <span>{data?.seeProductDashBoard?.TotalPurchase7Days}</span>
            </MiddleDashBox>
            <BottomDashBox></BottomDashBox>
          </DashBox>
        </DashContainer>
        <ChartContainer>
          <DashBox>
            <UpperDashBox>
              <h1>1주 판매량</h1>
              <span></span>
            </UpperDashBox>
            <ChartBox>
              <Chart
                options={option.options}
                series={data?.seeProductDashBoard?.chart1Object}
                width="330"
                type="area"
              ></Chart>
            </ChartBox>
            <ChartBottomBox>
              <span></span>
            </ChartBottomBox>
          </DashBox>
        </ChartContainer>
      </InfoBox>
    </UploadContainer>
  );
}
export default ProductDetail;
