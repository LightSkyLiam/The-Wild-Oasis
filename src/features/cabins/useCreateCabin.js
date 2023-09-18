import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      toast.success(`Cabin Successfuly Added`);
      queryClient.invalidateQueries({ queryKey: [`cabins`] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCreating, createCabin };
};
