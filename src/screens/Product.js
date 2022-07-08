import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { Children, useEffect } from "react";
import SignUpPC from "../components/SignUpPC";
import ReactSlider from "../components/Slider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nameArray } from "../components/nameArray";
import SignUpMobile from "../components/SignUpMobile";

const SEEDETAIL_QUERY = gql`
  query seeDetail($id: Int!) {
    seeDetail(id: $id) {
      id
      productName
      productEngName
      price
      thumbnail
      detailPage1
      detailPage2
      productSliderPictures {
        id
        order
        productSliderPicture
      }
    }
  }
`;

const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.fontColorBase};
  }
`;

const ContainerPC = styled.div`
  width: 100%;

  height: 100%;
  display: flex;
`;

const OrderPcContainer = styled.div`
  width: 400px;
  height: 800px;
  position: fixed;
  right: 0;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OrderMobileContainer = styled.div`
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.secondary};
`;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ProductDetail1 = styled.div`
  width: 100%;
  max-width: 720px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    display: flex;
    height: auto;
    object-fit: cover;
  }
`;

const ProductDetail2 = styled.div`
  width: 100%;
  max-width: 720px;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 100%;
    display: flex;
    height: auto;
    object-fit: cover;
  }
`;

function Product() {
  const { id } = useParams();
  const { loading, _, data } = useQuery(SEEDETAIL_QUERY, {
    variables: {
      id: parseInt(id),
    },
  });

  const detail1 = data?.seeDetail?.detailPage1;
  const detail2 = data?.seeDetail?.detailPage2;

  function createDetail1() {
    return { __html: detail1 };
  }

  function createDetail2() {
    return { __html: detail2 };
  }

  const isMobile = useMediaQuery({
    query: "(max-width:1100px)",
  });

  const [isDayTime, setIsDayTime] = React.useState(true);
  const [randomNumber, setRandomNumber] = React.useState(1);

  let arrayNumber = 0;

  useEffect(() => {
    const now = new Date();
    if (now.getHours() < 8) {
      setIsDayTime(false);
    } else {
      setIsDayTime(true);
    }
    setInterval(function () {
      toast.success(
        `${nameArray[arrayNumber]}**님이 무료체험을 신청하셨습니다`,
        {
          autoClose: 2000,
          position: "",
        }
      );
      arrayNumber = Math.ceil(Math.random() * 30);
    }, Math.ceil(Math.random() * 3000) + 8000);
  }, []);

  return (
    <div>
      <ProductContainer>
        {loading ? null : (
          <ContainerPC>
            <ProductDetailContainer>
              <ProductDetail1
                dangerouslySetInnerHTML={createDetail1()}
              ></ProductDetail1>

              <ProductDetail2
                dangerouslySetInnerHTML={createDetail2()}
              ></ProductDetail2>
            </ProductDetailContainer>
            <ToastContainer></ToastContainer>

            {isMobile ? (
              <OrderMobileContainer>
                <SignUpMobile></SignUpMobile>
              </OrderMobileContainer>
            ) : (
              <OrderPcContainer id="orderPC">
                <SignUpPC></SignUpPC>
                <ReactSlider
                  data={data?.seeDetail?.productSliderPictures}
                ></ReactSlider>
              </OrderPcContainer>
            )}
          </ContainerPC>
        )}
      </ProductContainer>
    </div>
  );
}
export default Product;
