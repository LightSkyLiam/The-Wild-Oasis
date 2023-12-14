import CabinForm from "./CabinForm";
import { useEditCabin } from "./useEditCabin";

function UpdateCabinForm({ cabinToEdit, onCloseModal }) {
  const { id: editId, imageName: lastImageName, ...editValues } = cabinToEdit;
  const { isLoading, editCabin } = useEditCabin();
  const onSubmit = async (data) => {
    editCabin(
      { ...data, id: editId, lastImageName },
      { onSuccess: onCloseModal }
    );
  };
  return (
    <CabinForm
      defaultValues={editValues}
      onSubmit={onSubmit}
      isLoading={isLoading}
      onCloseModal={onCloseModal}
      edit={true}
    />
  );
}

export default UpdateCabinForm;
