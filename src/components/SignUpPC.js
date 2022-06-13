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
    $phone: String!
    $size: String!
    $orderMethod: String!
  ) {
    createAccount(
      firstName: $firstName
      phone: $phone
      size: $size
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
  const inputSize = document.getElementById("inputSize");
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
    inputSize.options.length = 0;
    okBt.style.opacity = 0.5;
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign Up"></PageTitle>

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
            placeholder="-를 제외한 전화번호"
            id="inputPhone"
          />
          <FormError message={errors?.phone?.message}></FormError>
          <AuthSelect
            ref={register({ required: "발사이즈를 선택해주세요" })}
            name="size"
            id="inputSize"
          >
            <option value="" defaultValue>
              발사이즈
            </option>
            <option value="220">220</option>
            <option value="225">225</option>
            <option value="230">230</option>
            <option value="235">235</option>
            <option value="240">240</option>
            <option value="245">245</option>
            <option value="250">250</option>
            <option value="255">255</option>
            <option value="260">260</option>
            <option value="265">265</option>
            <option value="270">270</option>
            <option value="275">275</option>
            <option value="280">280</option>
            <option value="285">285</option>
            <option value="290">290</option>
            <option value="295">295</option>
            <option value="300">300</option>
          </AuthSelect>
          <FormError message={errors?.size?.message}></FormError>
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
