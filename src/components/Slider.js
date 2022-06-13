import { Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SSlider = styled.div`
  width: 350px;
  height: 700px;
  border-radius: 20px;
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  slidesToShow: 1,
  pauseOnHover: true,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
};

const PicContainer = styled.div`
  width: 300px;
  height: 500px;
`;

const Rounded = styled.img`
  border-radius: 20px;
  object-fit: cover;
`;

function ReactSlider({ data }) {
  console.log(data);
  return (
    <SSlider>
      <Slider {...settings}>
        {data?.map((picture) => (
          <PicContainer key={picture.id}>
            <Rounded src={picture.productSliderPicture}></Rounded>
          </PicContainer>
        ))}
      </Slider>
    </SSlider>
  );
}

export default ReactSlider;
