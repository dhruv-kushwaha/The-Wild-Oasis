import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import { TSignupType } from "../../schema/authSchema";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = function (data) {
    signup(data as TSignupType, {
      onSettled: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.name?.message as string}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message as string}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",

            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message as string}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
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
        error={errors?.confirmPassword?.message as string}
      >
        <Input
          type="password"
          id="confirmPassword"
          disabled={isLoading}
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button $variation="secondary" disabled={isLoading} type="reset">
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
