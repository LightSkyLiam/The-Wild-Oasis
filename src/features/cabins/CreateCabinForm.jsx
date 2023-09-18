import { useForm } from "react-hook-form";
import CabinForm from "./CabinForm";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ onCloseModal }) {
  const { reset } = useForm();
  const { isCreating, createCabin } = useCreateCabin();

  const onSubmit = async (data) => {
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      }
    );
  };
  return (
    <CabinForm
      onSubmit={onSubmit}
      isLoading={isCreating}
      onCloseModal={onCloseModal}
    />
  );
}

export default CreateCabinForm;
