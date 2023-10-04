import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ComingSoonModal from "../../ui/ComingSoonModal";
import { useState } from "react";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const [openModal, setOpenModal] = useState(false);
  function onSubmit() {
    setOpenModal(true);
  }

  return (
    <>
      {openModal && <ComingSoonModal onClose={() => setOpenModal(false)} />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
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
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </FormRow>
        <FormRow>
          <Button onClick={reset} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button>Update password</Button>
        </FormRow>
      </Form>
    </>
  );
}

export default UpdatePasswordForm;
