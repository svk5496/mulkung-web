import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "./auth/AuthLayout";
import PageTitle from "./pageTitle";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import MobileError from "./auth/MobileError";
import { FlexBox, HiddenInput } from "./shared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $productId: Int
    $firstName: String!
    $phone: String!
    $age: String!
    $orderMethod: String!
  ) {
    createAccount(
      productId: $productId
      firstName: $firstName
      phone: $phone
      age: $age
      orderMethod: $orderMethod
    ) {
      ok
      error
    }
  }
`;

const MobileBox = styled.div`
  width: 90vw;
  height: 100%;
  background-color: ${(props) => props.theme.secondary};
  display: flex;
  form {
    margin-top: 4px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 3px;
`;

const InputContainer = styled.div`
  width: 60%;
  span {
    margin-right: 4px;
    font-weight: 400;
    color: white;
  }
`;

const Input = styled.input`
  width: 80%;
  height: 20px;
  border-radius: 20px;
  padding: 2px 10px;
  font-size: 12px;
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

const InputComp = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  span {
    font-size: 14px;
  }
`;

const PhoneBox = styled(FlexBox)`
  justify-content: space-between;
  width: 80%;
`;

const PhoneInput = styled(Input)`
  width: 31%;
`;

const Button = styled.input`
  border: none;
  margin: 0px 6px;
  border-radius: 10px;

  margin-top: 10px;
  background-color: ${(props) => props.theme.primary};
  color: black;
  text-align: center;
  padding: 14px 0px;
  font-weight: 600;
  width: 40%;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
`;

const HiddenSelect = styled.select`
  display: none;
`;

function SignUpMobile() {
  const { id } = useParams();

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    data.phone = data.phone1 + data.phone2 + data.phone3;
    data.productId = parseInt(data.productId);

    createAccount({
      variables: {
        ...data,
      },
    });
    alert(
      "????????? ????????????????????????? ????????? ?????? 1~2??? ?????? ???????????????????????????? ???????????????????"
    );

    console.log(data);
    const inputName = document.getElementById("inputName");
    const inputPhone1 = document.getElementById("inputPhone1");
    const inputPhone2 = document.getElementById("inputPhone2");
    const inputPhone3 = document.getElementById("inputPhone3");
    const inputAge = document.getElementById("inputAge");
    const okBt = document.getElementById("okBt");

    inputName.value = "";
    inputAge.value = "";
    inputPhone1.value = "";
    inputPhone2.value = "";
    inputPhone3.value = "";

    //window.location.reload();
  };

  return (
    <div>
      <PageTitle title="???????????????"></PageTitle>

      <MobileBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormContainer>
            <InputContainer>
              <InputComp>
                <span>??????</span>
                <Input
                  ref={register({ required: "????????? ??????????????????" })}
                  name="firstName"
                  type="text"
                  id="inputName"
                />
              </InputComp>
              <HiddenInput
                ref={register()}
                name="productId"
                defaultValue={id}
                type="text"
                placeholder="?????????"
              ></HiddenInput>

              <InputComp>
                <span>??????</span>
                <PhoneBox>
                  <PhoneInput
                    ref={register({
                      required: "??????????????? ??????????????????",
                    })}
                    name="phone1"
                    type="number"
                    id="inputPhone1"
                    maxLength={3}
                  />
                  <PhoneInput
                    ref={register({
                      required: "??????????????? ??????????????????",
                    })}
                    name="phone2"
                    type="number"
                    id="inputPhone2"
                    maxLength={4}
                  />
                  <PhoneInput
                    ref={register({
                      required: "??????????????? ??????????????????",
                    })}
                    name="phone3"
                    type="number"
                    id="inputPhone3"
                    maxLength={4}
                  />
                </PhoneBox>
              </InputComp>
              <InputComp>
                <span>??????</span>
                <Input
                  ref={register({
                    required: "????????? ??????????????????",
                  })}
                  name="age"
                  type="number"
                  id="inputAge"
                  maxLength={3}
                />
              </InputComp>

              <HiddenSelect name="orderMethod" ref={register({})}>
                <option value="phone">????????? ????????????</option>
                <option value="chat">???????????? ????????????</option>
              </HiddenSelect>
            </InputContainer>

            <Button
              type="submit"
              value="7??? ???????????? ????????????"
              disabled={!formState.isValid || loading}
              id="okBt"
            />
          </FormContainer>
        </form>
      </MobileBox>
    </div>
  );
}
export default SignUpMobile;
