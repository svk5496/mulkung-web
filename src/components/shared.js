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
`;

export const FlexColumBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

export const PaginationBox = styled.div`
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
