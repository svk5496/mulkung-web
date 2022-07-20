import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routes from "../routes";
import Chart from "react-apexcharts";
import {
  formatedDay0,
  formatedDay1,
  formatedDay2,
  formatedDay3,
  formatedDay4,
  formatedDay5,
  formatedDay6,
} from "../../components/sharedFunction";

const Base = styled.div`
  width: 100%;
  height: 100%;
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
  margin-left: 30px;
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

const SEE_DASH_BOARD_QUERY = gql`
  query SeeDashBoard {
    seeDashBoard {
      ok
      error
      countUsers
      countOrders
      countRefunds
      landing1TotalPurchase
      landing2TotalPurchase
      chart1Object {
        name
        data
      }
      chart2Object {
        name
        data
      }
    }
  }
`;

function AdminStore() {
  const { data, loading } = useQuery(SEE_DASH_BOARD_QUERY, {});

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

  return (
    <>
      {data ? (
        <Base>
          <HeaderBox>
            <H1>Dash Board</H1>
          </HeaderBox>
          <DashContainer>
            <DashBox>
              <UpperDashBox>
                <h1>사용자</h1>
                <span></span>
              </UpperDashBox>
              <MiddleDashBox>
                <span>{data.seeDashBoard.countUsers}</span>
              </MiddleDashBox>
              <BottomDashBox>
                <Link to={routes.adminUser}>
                  <span>See all users</span>
                </Link>
              </BottomDashBox>
            </DashBox>
            <DashBox>
              <UpperDashBox>
                <h1>매출</h1>
                <span></span>
              </UpperDashBox>
              <MiddleDashBox>
                <span>
                  {(data.seeDashBoard.countOrders * 79000)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </MiddleDashBox>
              <BottomDashBox>
                <Link to={routes.adminOrderNew}>
                  <span>See all Orders</span>
                </Link>
              </BottomDashBox>
            </DashBox>
            <DashBox>
              <UpperDashBox>
                <h1>환불요청</h1>
                <span></span>
              </UpperDashBox>
              <MiddleDashBox>
                <span>{data.seeDashBoard.countRefunds}</span>
              </MiddleDashBox>
              <BottomDashBox>
                <Link to={routes.adminOrderReturned}>
                  <span>See all Refunds</span>
                </Link>
              </BottomDashBox>
            </DashBox>
          </DashContainer>
          <ChartContainer>
            <DashBox>
              <UpperDashBox>
                <h1>랜딩페이지1</h1>
                <span></span>
              </UpperDashBox>
              <ChartBox>
                <Chart
                  options={option.options}
                  series={data?.seeDashBoard.chart1Object}
                  width="330"
                  type="area"
                ></Chart>
              </ChartBox>
              <ChartBottomBox>
                <span></span>
                <span>
                  {(data?.seeDashBoard.landing1TotalPurchase)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  건/주
                </span>
              </ChartBottomBox>
            </DashBox>
            <DashBox>
              <UpperDashBox>
                <h1>랜딩페이지2</h1>
                <span></span>
              </UpperDashBox>
              <ChartBox>
                {" "}
                <Chart
                  options={option.options}
                  series={data?.seeDashBoard.chart2Object}
                  width="330"
                  type="area"
                ></Chart>
              </ChartBox>
              <ChartBottomBox>
                <span></span>

                <span>
                  {(data?.seeDashBoard.landing2TotalPurchase)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  건/주
                </span>
              </ChartBottomBox>
            </DashBox>
          </ChartContainer>
        </Base>
      ) : null}
    </>
  );
}
export default AdminStore;
