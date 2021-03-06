import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import AuthButton from "./auth/AuthButton";
import AuthFormBox from "./auth/AuthFormBox";
import AuthInput from "./auth/AuthInput";
import AuthLayout from "./auth/AuthLayout";
import AuthSelect from "./auth/AuthSelect";
import FormError from "./auth/FormError";
import PageTitle from "./pageTitle";
import { ToastContainer, toast } from "react-toastify";
import { HiddenInput } from "./shared";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $productId: Int
    $firstName: String!
    $phone: String
    $age: String
    $orderMethod: String
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
  const inputName = document.getElementById("inputName");
  const inputPhone = document.getElementById("inputPhone");
  const inputAge = document.getElementById("inputAge");
  const okBt = document.getElementById("okBt");

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    data.productId = parseInt(data.productId);
    createAccount({
      variables: {
        ...data,
      },
    });
    alert(
      "????????? ????????????????????????? ????????? ?????? 1~2??? ?????? ???????????????????????????? ???????????????????"
    );
    inputName.value = "";
    inputAge.value = "";
    inputPhone.value = "";
  };

  return (
    <AuthLayout>
      <PageTitle title="???????????????"></PageTitle>

      <AuthFormBox>
        <Title>7????????? ????????????</Title>
        <Subtitle>???????????? : 1688-3596</Subtitle>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <AuthInput
            ref={register({ required: "????????? ??????????????????" })}
            name="firstName"
            type="text"
            placeholder="??????"
            id="inputName"
          />
          <FormError message={errors?.firstName?.message}></FormError>
          <HiddenInput
            ref={register()}
            name="productId"
            defaultValue={parseInt(id)}
            type="text"
            placeholder="?????????"
          ></HiddenInput>
          <AuthInput
            ref={register({
              required: "??????????????? ??????????????????",
              minLength: {
                value: 9,
                message: "??????????????? 11????????? ??????????????????",
              },
            })}
            name="phone"
            type="text"
            placeholder="????????? ??????(????????? ??????)"
            id="inputPhone"
          />
          <FormError message={errors?.phone?.message}></FormError>
          <AuthInput
            ref={register({
              required: "????????? ??????????????????",
            })}
            name="age"
            type="text"
            placeholder="??????"
            id="inputAge"
          />
          <FormError message={errors?.age?.message}></FormError>
          <HiddenSelect name="orderMethod" ref={register({})}>
            <option value="phone" defaultValue>
              ????????? ????????????
            </option>
            <option value="chat">???????????? ????????????</option>
          </HiddenSelect>

          <AuthButton
            type="submit"
            value="???????????? ????????????"
            disabled={!formState.isValid || loading}
            id="okBt"
          />
        </form>
      </AuthFormBox>
    </AuthLayout>
  );
}
export default SignUpPc;
