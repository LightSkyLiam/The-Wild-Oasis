import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import countryList from "react-select-country-list";
import { useRef } from "react";
import _ from "lodash";

function GuestInfoForm({
  onSubmit,
  defaultValues = {},
  isLoading = false,
  onCloseModal,
  edit = false,
}) {
  const {
    formState: { errors },
    register,
    handleSubmit,
    clearErrors,
    setError,
  } = useForm({
    defaultValues,
    criteriaMode: "all",
  });
  let countryCode = useRef(
    edit ? countryList().getValue(defaultValues.nationality) : ""
  );
  const submit = (values) => {
    if (_.isEqual(values, defaultValues)) return;
    if (!countryCode.current) {
      setError("nationality", {
        message: "please Enter A Valid Country",
      });
      return;
    }
    if (values.nationalID.length < 7) return;
    if (errors.length > 0) return;
    onSubmit({
      ...values,
      countryFlag: `https://flagcdn.com/${countryCode.current.toLowerCase()}.svg`,
    });
  };

  const checkEmail = (email) => {
    clearErrors("email");
    !/^[\w-.]+@([A-Za-z]+\.)+[A-Za-z]{2,4}$/.test(email) &&
      setError(
        "email",
        {
          message: `please enter a valid email address`,
        },
        { shouldFocus: true }
      );
  };

  const checkNationality = (nationality) => {
    clearErrors("nationality");
    countryCode.current = countryList().getValue(nationality);
    !countryCode.current &&
      setError("nationality", {
        message: "please Enter A Valid Country",
      });
  };

  const checkNationalId = (nationalID) => {
    clearErrors("nationalID");
    nationalID.length < 7 &&
      setError(
        "nationalID",
        { message: "National ID Should Be 7 Numbers or More" },
        { shouldFocus: true }
      );
  };

  return (
    <Form type={`modal`} onSubmit={handleSubmit(submit)}>
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          autoFocus
          name="fullName"
          type="text"
          id="fullName"
          {...register(`fullName`, { required: `Please Enter Full Name` })}
        />
      </FormRow>
      <FormRow label="Email Adress" error={errors?.email?.message}>
        <Input
          name="email"
          type="email"
          id="email"
          {...register(`email`, {
            required: "Please Enter A Valid Email",
            onBlur: (e) => e.target.value && checkEmail(e.target.value),
          })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          name="nationality"
          type="text"
          id="nationality"
          {...register(`nationality`, {
            required: "Please Enter Nationality",
            onBlur: (e) => e.target.value && checkNationality(e.target.value),
          })}
        />
      </FormRow>
      <FormRow label="National ID Number" error={errors?.nationalID?.message}>
        <Input
          min={0}
          name="nationalID"
          type="number"
          id="nationalID"
          {...register(`nationalID`, {
            required: "Please Enter National ID",
            onBlur: (e) => checkNationalId(e.target.value),
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} type={edit ? "submit" : "primary"}>
          {edit ? "Update" : "Next"}{" "}
        </Button>
      </FormRow>
    </Form>
  );
}

export default GuestInfoForm;
