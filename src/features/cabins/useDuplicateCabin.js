import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { duplicateCabin as duplicateCabinApi } from "../../services/apiCabins";

export const useDuplicateCabin = () => {
  const queryClient = useQueryClient();
  const { isLoading: isDuplicating, mutate: duplicateCabin } = useMutation({
    mutationFn: duplicateCabinApi,
    onSuccess: () => {
      toast.success(`Cabin Successfuly Duplicated`);
      queryClient.invalidateQueries({ queryKey: [`cabins`] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDuplicating, duplicateCabin };
};
