import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutate: editCabin } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success(`Cabin Successfuly Edited`);
      queryClient.invalidateQueries({ queryKey: [`cabins`] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isLoading, editCabin };
};
