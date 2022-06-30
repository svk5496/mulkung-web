import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "./auth/AuthLayout";
import PageTitle from "./pageTitle";
import { ToastContainer, toast } from "react-toastify";
import MobileError from "./auth/MobileError";
import { FlexBox } from "./shared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $phone: String!
    $age: String!
    $orderMethod: String!
  ) {
    createAccount(
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
  width: 100%;
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
  margin-right: 6px;
  border-radius: 10px;

  margin-top: 10px;
  background-color: ${(props) => props.theme.primary};
  color: black;
  text-align: center;
  padding: 14px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.6" : "1")};
`;

const HiddenSelect = styled.select`
  display: none;
`;

function SignUpMobile() {
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
  const inputName = document.getElementById("inputName");
  const inputPhone = document.getElementById("inputPhone");
  const inputAge = document.getElementById("inputAge");
  const okBt = document.getElementById("okBt");

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    data.phone = data.phone1 + data.phone2 + data.phone3;
    createAccount({
      variables: {
        ...data,
      },
    });

    alert(
      "신청이 완료되었습니다😀 영업일 기준 1~2일 내에 연락드리겠습니다📞 감사합니다🙌"
    );
    window.location.reload();
  };

  return (
    <div>
      <PageTitle title="오직편안함"></PageTitle>

      <MobileBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormContainer>
            <InputContainer>
              <InputComp>
                <span>이름</span>
                <Input
                  ref={register({ required: "이름을 입력해주세요" })}
                  name="firstName"
                  type="text"
                  id="inputName"
                />
              </InputComp>

              <InputComp>
                <span>번호</span>
                <PhoneBox>
                  <PhoneInput
                    ref={register({
                      required: "전화번호를 입력해주세요",
                    })}
                    name="phone1"
                    type="text"
                    id="inputPhone1"
                    maxLength={3}
                  />
                  <PhoneInput
                    ref={register({
                      required: "전화번호를 입력해주세요",
                    })}
                    name="phone2"
                    type="text"
                    id="inputPhone2"
                    maxLength={4}
                  />
                  <PhoneInput
                    ref={register({
                      required: "전화번호를 입력해주세요",
                    })}
                    name="phone3"
                    type="text"
                    id="inputPhone3"
                    maxLength={4}
                  />
                </PhoneBox>
              </InputComp>
              <InputComp>
                <span>나이</span>
                <Input
                  ref={register({
                    required: "나이를 입력해주세요",
                  })}
                  name="age"
                  type="number"
                  id="inputAge"
                  maxLength={3}
                />
              </InputComp>

              <HiddenSelect name="orderMethod" ref={register({})}>
                <option value="phone" defaultValue>
                  전화로 상담받기
                </option>
                <option value="chat">채팅으로 상담받기</option>
              </HiddenSelect>
            </InputContainer>

            <Button
              type="submit"
              value="7일 무료체험 신청하기"
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
