import styled from "styled-components";

export const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;

export const HiddenInput = styled.input`
  width: 100%;
  display: none;
`;

export const SubHeader = styled.span`
  font-weight: 600;
  font-size: 24px;
`;

export const HiddenBox = styled.div`
  display: none;
`;

export const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Checkbox = styled.input`
  -webkit-appearance: checkbox !important;
  -moz-appearance: checkbox !important;
  -ms-appearance: checkbox !important;
  -o-appearance: checkbox !important;
  appearance: checkbox !important;
  accent-color: ${(props) => props.theme.secondary};
`;

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 2px;
  padding: 7px 20px;
  background-color: white;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }
  -webkit-appearance: none;
`;
