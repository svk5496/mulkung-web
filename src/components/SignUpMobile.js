import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "./auth/AuthLayout";
import PageTitle from "./pageTitle";
import { ToastContainer, toast } from "react-toastify";
import MobileError from "./auth/MobileError";

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
  width: 100%;
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
  margin-left: 6px;
`;

const Input = styled.input`
  width: 150px;
  height: 20px;
  border-radius: 20px;
  padding: 2px 20px;
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
    createAccount({
      variables: {
        ...data,
      },
    });

    toast.success("신청이 완료되었습니다", {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER,
    });
    inputName.value = null;
    inputPhone.value = null;
    inputAge.value = null;
    okBt.style.opacity = 0.5;
  };

  return (
    <AuthLayout>
      <PageTitle title="오직편안함"></PageTitle>

      <MobileBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <FormContainer>
            <InputContainer>
              <div>
                <Input
                  ref={register({ required: "이름을 입력해주세요" })}
                  name="firstName"
                  type="text"
                  id="inputName"
                  placeholder="이름"
                />
              </div>

              <MobileError message={errors?.firstName?.message}></MobileError>
              <Input
                ref={register({
                  required: "전화번호를 입력해주세요",
                  minLength: {
                    value: 9,
                    message: "전화번호는 11자리를 입력해주세요",
                  },
                })}
                name="phone"
                type="text"
                placeholder="핸드폰 번호(숫자만 입력)"
                id="inputPhone"
              />
              <MobileError message={errors?.phone?.message}></MobileError>
              <Input
                ref={register({
                  required: "나이를 입력해주세요",
                })}
                name="age"
                type="text"
                placeholder="나이"
                id="inputAge"
              />
              <MobileError message={errors?.age?.message}></MobileError>

              <MobileError message={errors?.size?.message}></MobileError>
              <HiddenSelect name="orderMethod" ref={register({})}>
                <option value="phone" defaultValue>
                  전화로 상담받기
                </option>
                <option value="chat">채팅으로 상담받기</option>
              </HiddenSelect>
            </InputContainer>

            <Button
              type="submit"
              value="무료체험 신청하기"
              disabled={!formState.isValid || loading}
              id="okBt"
            />
          </FormContainer>
        </form>
      </MobileBox>
    </AuthLayout>
  );
}
export default SignUpMobile;
