import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthButton from "./auth/AuthButton";
import AuthFormBox from "./auth/AuthFormBox";
import AuthInput from "./auth/AuthInput";
import AuthLayout from "./auth/AuthLayout";
import AuthSelect from "./auth/AuthSelect";
import FormError from "./auth/FormError";
import PageTitle from "./pageTitle";
import { ToastContainer, toast } from "react-toastify";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $phone: String
    $age: String
    $orderMethod: String
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

const Title = styled.h2`
  font-weight: 600;
  font-size: ${(props) => props.theme.fs_subTitle3};
  margin-bottom: 4px;
  color: white;
`;

const Subtitle = styled.h3`
  font-weight: 600;
  font-size: ${(props) => props.theme.fs_body3};
  margin-bottom: 4px;
  color: white;
`;

const HiddenSelect = styled.select`
  display: none;
`;

function SignUpPc() {
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

      <AuthFormBox>
        <Title>7일동안 무료체험</Title>
        <Subtitle>대표전화 : 1688-3596</Subtitle>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <AuthInput
            ref={register({ required: "이름을 입력해주세요" })}
            name="firstName"
            type="text"
            placeholder="이름"
            id="inputName"
          />
          <FormError message={errors?.firstName?.message}></FormError>
          <AuthInput
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
          <FormError message={errors?.phone?.message}></FormError>
          <AuthInput
            ref={register({
              required: "나이를 입력해주세요",
            })}
            name="age"
            type="text"
            placeholder="나이"
            id="inputAge"
          />
          <FormError message={errors?.age?.message}></FormError>
          <HiddenSelect name="orderMethod" ref={register({})}>
            <option value="phone" defaultValue>
              전화로 상담받기
            </option>
            <option value="chat">채팅으로 상담받기</option>
          </HiddenSelect>

          <AuthButton
            type="submit"
            value="무료체험 신청하기"
            disabled={!formState.isValid || loading}
            id="okBt"
          />
        </form>
      </AuthFormBox>
    </AuthLayout>
  );
}
export default SignUpPc;
