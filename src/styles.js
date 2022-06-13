import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  primary: "#D3E357",
  primaryDark: "#A5E357",
  primaryLight: "#D3E357",

  secondary: "#307157",
  secondaryDark: "#3A3F14",

  borderColor: "#DBDBDB",

  fontColorBase: "#2c2c2c",

  fontLightGray: "#E9E9E9",
  fontGray: "#8E8E8E",
  fontDarkGray: "#65665B",
  fontHighLight: "#FF4800",

  bgGrayLight: "#EFEFEF",
  bgGray: "#7f7f7f",
  bgGrayDark: "#DFDFDF",
  bgColorLight: "#F6F6EE",
  bgColor: "#F5F8E5",
  bgColorDark: "#E6EACB",

  fs_headline1: "80px",
  fs_headline2: "56px",
  fs_subTitle1: "40px",
  fs_subTitle2: "32px",
  fs_subTitle3: "20px",
  fs_body1: "24px",
  fs_body2: "20px",
  fs_body3: "18px",
  fs_body4: "16px",
  fs_body5: "14px",
  fs_body6: "12px",

  fw_black: "900",
  fw_bold: "700",
  fw_medium: "500",
  fw_regular: "400",
  fw_light: "300",
  fw_thin: "100",

  font_eng: "'Jost', sans-serif",
  font_kor: "'Noto Sans KR', sans-serif",
};

export const darkTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing:border-box;
    }
    input {
        all:unset
    }
    body {
        background-color: ${(props) => props.theme.bgColor};
        font-size:14px;
        font-family: 'Jost', sans-serif;
    }
`;
