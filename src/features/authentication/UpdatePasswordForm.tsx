import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { TUpdatePasswordType } from "../../schema/authSchema";
import useUpdatePassword from "./useUpdatePassword";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<TUpdatePasswordType>();
  const { errors } = formState;

  const { updatePassword, isUpdating } = useUpdatePassword();

  const onSubmit: SubmitHandler<TUpdatePasswordType> = function (data) {
    updatePassword(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.confirmPassword?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="confirmPassword"
          disabled={isUpdating}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <ButtonContainer>
          <Button onClick={() => reset()} type="reset" $variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </ButtonContainer>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
