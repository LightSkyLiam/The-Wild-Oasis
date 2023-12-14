import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";

function CabinForm({
  onSubmit,
  defaultValues = {},
  isLoading,
  onCloseModal,
  edit = false,
}) {
  const { register, handleSubmit, getValues, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;
  return (
    <Form
      type={onCloseModal ? `modal` : `regular`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="name"
          {...register(`name`, { required: `This Field Is Required` })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="maxCapacity"
          {...register(`maxCapacity`, {
            required: `This Field Is Required`,
            min: { value: 1, message: `Capacity Should Be Atleast 1` },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="regularPrice"
          {...register(`regularPrice`, {
            required: `This Field Is Required`,
            min: { value: 1, message: `Price Should Be Higher Than 0` },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="discount"
          {...register(`discount`, {
            required: `This Field Is Required`,
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              `Discount Should Be Less Than Regular Price`,
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          {...register(`description`, { required: `This Field Is Required` })}
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          type="file"
          {...register(`image`, {
            required: edit ? false : `This Field Is Required`,
          })}
          id="image"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? `Loading...` : edit ? `Edit Cabin` : `Add cabin`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CabinForm;
