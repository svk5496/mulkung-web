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

const Select = styled.select`
  width: 150px;
  max-height: 25px;
  border-radius: 20px;
  padding: 2px 20px;
  background-color: white;
  font-size: 12px;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  &:focus {
    border-color: ${(props) => props.theme.primary};
  }

  option {
    background-color: ${(props) => props.theme.primary};
    font-size: 12px;
  }
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
                placeholder="-를 제외한 전화번호"
                id="inputPhone"
              />
              <MobileError message={errors?.phone?.message}></MobileError>
              <Select
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
              </Select>
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
